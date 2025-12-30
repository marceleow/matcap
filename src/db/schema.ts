import cuid from "cuid";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const materials = sqliteTable("materials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => cuid()),
  name: text("name").notNull(),
  typeId: text("type_id")
    .notNull()
    .references(() => materialTypes.id),
  code: text("code"),
  uom: text("uom").notNull(),
  minStockLevel: integer("min_stock_level").notNull().default(0),
  note: text("note"),
});

export const materialTypes = sqliteTable("material_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => cuid()),
  name: text("name").notNull(),
});

export const stockMovements = sqliteTable("stock_movements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => cuid()),

  materialId: text("material_id")
    .notNull()
    .references(() => materials.id),

  /**
   * +N  = material masuk
   * -N  = material keluar
   */
  quantity: integer("quantity").notNull(),

  /**
   * IN | OUT
   * redundan? iya.
   * berguna? SANGAT.
   */
  type: text("type").notNull(),

  // hanya untuk OUT
  location: text("location"), // lokasi pekerjaan
  jobType: text("job_type"), // jenis pekerjaan

  note: text("note"),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
