"use server";

import { db } from "#/db";
import { materials, materialTypes, stockMovements } from "#/db/schema";
import { FormState } from "#/lib/type";
import { eq, sql } from "drizzle-orm";
import z from "zod";

const createMaterialSchema = z.object({
  name: z.string().min(1),
  materialTypeName: z.string().min(1),
  code: z.string().optional(),
  stockMin: z.coerce.number().min(0),
  uom: z.string().min(1),
  note: z.string().optional(),
});

export const createMaterial = async (
  _: FormState,
  form: FormData,
): Promise<FormState> => {
  const parsed = createMaterialSchema.safeParse(Object.fromEntries(form));

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { name, materialTypeName, code, stockMin, uom, note } = parsed.data;

  let materialType = await db.query.materialTypes.findFirst({
    where: eq(materialTypes.name, materialTypeName),
  });

  if (!materialType) {
    materialType = await db
      .insert(materialTypes)
      .values({ name: materialTypeName })
      .returning()
      .get();
  }

  const data = await db
    .insert(materials)
    .values({
      name,
      typeId: materialType.id,
      code,
      minStockLevel: stockMin,
      uom,
      note: note ?? "",
    })
    .returning()
    .get();

  return {
    success: true,
    message: "Material baru berhasil ditambahkan.",
    redirectTo: "/material",
  };
};

export const getMaterialTypes = async () =>
  await db.select().from(materialTypes);

export const getMaterials = async () => {
  const data = await db
    .select({
      id: materials.id,
      name: materials.name,
      code: materials.code,
      type: materialTypes.name,
      minStock: materials.minStockLevel,
      uom: materials.uom,
      note: materials.note,

      stock: sql<number>`
        coalesce(sum(${stockMovements.quantity}), 0)
      `,

      stockStatus: sql<"critical" | "low" | "safe">`
        CASE
          WHEN coalesce(sum(${stockMovements.quantity}), 0) <= 0 THEN 'critical'
          WHEN coalesce(sum(${stockMovements.quantity}), 0) <= ${materials.minStockLevel} THEN 'low'
          ELSE 'safe'
        END
      `,
    })
    .from(materials)
    .innerJoin(materialTypes, eq(materials.typeId, materialTypes.id))
    .leftJoin(stockMovements, eq(stockMovements.materialId, materials.id))
    .groupBy(materials.id);

  return data;
};

export const getMaterialById = async (materialId: string) => {
  const material = await db
    .select({
      id: materials.id,
      name: materials.name,
      code: materials.code,
      type: materialTypes.name,
      uom: materials.uom,
      minStock: materials.minStockLevel,
      note: materials.note,

      stock: sql<number>`
          coalesce(sum(${stockMovements.quantity}), 0)
        `,

      stockStatus: sql<"critical" | "low" | "safe">`
          CASE
            WHEN coalesce(sum(${stockMovements.quantity}), 0) <= 0 THEN 'critical'
            WHEN coalesce(sum(${stockMovements.quantity}), 0) <= ${materials.minStockLevel} THEN 'low'
            ELSE 'safe'
          END
        `,
    })
    .from(materials)
    .innerJoin(materialTypes, eq(materials.typeId, materialTypes.id))
    .leftJoin(stockMovements, eq(stockMovements.materialId, materials.id))
    .where(eq(materials.id, materialId))
    .groupBy(materials.id)
    .get();

  return material;
};

const materialOutSchema = z.object({
  materialId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
  location: z.string().min(1),
  job: z.string().min(1),
  note: z.string().optional(),
});

export const materialOut = async (
  _: FormState,
  formData: FormData,
): Promise<FormState> => {
  const parsed = materialOutSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { materialId, quantity, location, job, note } = parsed.data;

  // 1️⃣ Hitung stok saat ini
  const [current] = await db
    .select({
      stock: sql<number>`coalesce(sum(${stockMovements.quantity}), 0)`,
    })
    .from(stockMovements)
    .where(eq(stockMovements.materialId, materialId));

  const currentStock = current.stock;

  // 2️⃣ Validasi stok cukup
  if (currentStock < quantity) {
    return {
      message: `Stok tidak cukup. Tersedia ${currentStock}, diminta ${quantity}`,
      success: false,
    };
  }

  // 3️⃣ Insert movement (NEGATIF)
  await db.insert(stockMovements).values({
    materialId,
    quantity: -quantity,
    type: "OUT",
    location,
    jobType: job,
    note: note ?? "",
    createdAt: new Date(),
  });

  return { success: true, redirectTo: "/material" };
};

const materialInSchema = z.object({
  materialId: z.string().min(1),
  quantity: z.coerce.number().int().positive(),
  note: z.string().optional(),
});

export const materialIn = async (_: any, formData: FormData) => {
  const parsed = materialInSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      success: false,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { materialId, quantity, note } = parsed.data;

  // cek material ada atau tidak
  const material = await db.query.materials.findFirst({
    where: eq(materials.id, materialId),
    columns: { id: true },
  });

  if (!material) {
    return {
      success: false,
      message: "Material tidak ditemukan",
    };
  }

  try {
    await db.insert(stockMovements).values({
      materialId,
      type: "IN",
      quantity,
      note,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Material masuk berhasil dicatat",
      redirectTo: `/material`,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Gagal mencatat material masuk",
    };
  }
};
