import { boolean, decimal, index, int, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core"

const id = (name: string) => varchar(name, { length: 191 })
const createdAt = () => timestamp("created_at").defaultNow().notNull()
const updatedAt = () => timestamp("updated_at").defaultNow().onUpdateNow().notNull()

export const user = mysqlTable("user", {
  id: id("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: varchar("image", { length: 500 }),
  phone: varchar("phone", { length: 32 }),
  phoneVerified: boolean("phone_verified").default(false).notNull(),
  role: mysqlEnum("role", ["CUSTOMER", "MANAGER", "ADMIN"]).default("CUSTOMER").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => ({ emailUnique: uniqueIndex("user_email_unique").on(table.email), phoneUnique: uniqueIndex("user_phone_unique").on(table.phone) }))

export const session = mysqlTable("session", {
  id: id("id").primaryKey(),
  token: varchar("token", { length: 255 }).notNull(),
  userId: id("user_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address", { length: 128 }),
  userAgent: text("user_agent"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => ({ tokenUnique: uniqueIndex("session_token_unique").on(table.token), userIndex: index("session_user_idx").on(table.userId) }))

export const account = mysqlTable("account", {
  id: id("id").primaryKey(),
  accountId: varchar("account_id", { length: 191 }).notNull(),
  providerId: varchar("provider_id", { length: 191 }).notNull(),
  userId: id("user_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: varchar("scope", { length: 255 }),
  password: text("password"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => ({ providerAccountUnique: uniqueIndex("account_provider_account_unique").on(table.providerId, table.accountId), userIndex: index("account_user_idx").on(table.userId) }))

export const verification = mysqlTable("verification", {
  id: id("id").primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (table) => ({ identifierIndex: index("verification_identifier_idx").on(table.identifier) }))

export const category = mysqlTable("category", {
  id: id("id").primaryKey(), name: varchar("name", { length: 191 }).notNull(), slug: varchar("slug", { length: 191 }).notNull(), description: text("description"), image: varchar("image", { length: 500 }), isActive: boolean("is_active").default(true).notNull(), sortOrder: int("sort_order").default(0).notNull(), createdAt: createdAt(), updatedAt: updatedAt(),
}, (table) => ({ slugUnique: uniqueIndex("category_slug_unique").on(table.slug), activeIndex: index("category_active_sort_idx").on(table.isActive, table.sortOrder) }))

export const product = mysqlTable("product", {
  id: id("id").primaryKey(), name: varchar("name", { length: 191 }).notNull(), slug: varchar("slug", { length: 191 }).notNull(), description: text("description").notNull(), price: int("price").notNull(), oldPrice: int("old_price"), brand: varchar("brand", { length: 191 }), isActive: boolean("is_active").default(true).notNull(), isFeatured: boolean("is_featured").default(false).notNull(), isBestSeller: boolean("is_best_seller").default(false).notNull(), stockQuantity: int("stock_quantity").default(0).notNull(), lowStockAt: int("low_stock_at").default(5).notNull(), ratingAverage: decimal("rating_average", { precision: 3, scale: 2 }).default("0").notNull(), reviewCount: int("review_count").default(0).notNull(), categoryId: id("category_id").notNull(), createdAt: createdAt(), updatedAt: updatedAt(),
}, (table) => ({ slugUnique: uniqueIndex("product_slug_unique").on(table.slug), categoryActiveIndex: index("product_category_active_idx").on(table.categoryId, table.isActive), createdIndex: index("product_active_created_idx").on(table.isActive, table.createdAt) }))

export const productImage = mysqlTable("product_image", { id: id("id").primaryKey(), url: varchar("url", { length: 1000 }).notNull(), alt: varchar("alt", { length: 255 }), sortOrder: int("sort_order").default(0).notNull(), productId: id("product_id").notNull() }, (table) => ({ productIndex: index("product_image_product_idx").on(table.productId, table.sortOrder) }))

export const cart = mysqlTable("cart", { id: id("id").primaryKey(), userId: id("user_id"), sessionId: varchar("session_id", { length: 191 }), createdAt: createdAt(), updatedAt: updatedAt() }, (table) => ({ userUnique: uniqueIndex("cart_user_unique").on(table.userId), sessionUnique: uniqueIndex("cart_session_unique").on(table.sessionId) }))
export const cartItem = mysqlTable("cart_item", { id: id("id").primaryKey(), cartId: id("cart_id").notNull(), productId: id("product_id").notNull(), quantity: int("quantity").notNull() }, (table) => ({ itemUnique: uniqueIndex("cart_item_unique").on(table.cartId, table.productId) }))
export const address = mysqlTable("address", { id: id("id").primaryKey(), userId: id("user_id").notNull(), label: varchar("label", { length: 100 }).notNull(), fullName: varchar("full_name", { length: 191 }).notNull(), phone: varchar("phone", { length: 32 }).notNull(), governorate: varchar("governorate", { length: 100 }).notNull(), city: varchar("city", { length: 100 }).notNull(), district: varchar("district", { length: 100 }).notNull(), details: text("details").notNull(), landmark: varchar("landmark", { length: 255 }), deliveryNotes: text("delivery_notes"), isDefault: boolean("is_default").default(false).notNull(), createdAt: createdAt(), updatedAt: updatedAt() }, (table) => ({ userIndex: index("address_user_idx").on(table.userId, table.isDefault) }))

export const order = mysqlTable("order", { id: id("id").primaryKey(), orderNumber: varchar("order_number", { length: 64 }).notNull(), userId: id("user_id").notNull(), addressId: id("address_id").notNull(), status: mysqlEnum("status", ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]).default("PENDING").notNull(), subtotal: int("subtotal").notNull(), discount: int("discount").default(0).notNull(), shipping: int("shipping").default(0).notNull(), total: int("total").notNull(), customerNote: text("customer_note"), internalNote: text("internal_note"), createdAt: createdAt(), updatedAt: updatedAt() }, (table) => ({ numberUnique: uniqueIndex("order_number_unique").on(table.orderNumber), userCreatedIndex: index("order_user_created_idx").on(table.userId, table.createdAt), statusIndex: index("order_status_created_idx").on(table.status, table.createdAt) }))
export const orderItem = mysqlTable("order_item", { id: id("id").primaryKey(), orderId: id("order_id").notNull(), productId: id("product_id").notNull(), name: varchar("name", { length: 191 }).notNull(), price: int("price").notNull(), quantity: int("quantity").notNull() }, (table) => ({ orderIndex: index("order_item_order_idx").on(table.orderId) }))
export const favorite = mysqlTable("favorite", { id: id("id").primaryKey(), userId: id("user_id").notNull(), productId: id("product_id").notNull(), createdAt: createdAt() }, (table) => ({ uniqueFavorite: uniqueIndex("favorite_user_product_unique").on(table.userId, table.productId) }))
export const review = mysqlTable("review", { id: id("id").primaryKey(), userId: id("user_id").notNull(), productId: id("product_id").notNull(), rating: int("rating").notNull(), comment: text("comment"), isApproved: boolean("is_approved").default(false).notNull(), createdAt: createdAt() }, (table) => ({ uniqueReview: uniqueIndex("review_user_product_unique").on(table.userId, table.productId), productIndex: index("review_product_approved_idx").on(table.productId, table.isApproved) }))
export const contactInquiry = mysqlTable("contact_inquiry", { id: id("id").primaryKey(), name: varchar("name", { length: 191 }).notNull(), email: varchar("email", { length: 191 }).notNull(), phone: varchar("phone", { length: 32 }), subject: varchar("subject", { length: 191 }).notNull(), message: text("message").notNull(), status: varchar("status", { length: 32 }).default("NEW").notNull(), createdAt: createdAt(), updatedAt: updatedAt() }, (table) => ({ statusIndex: index("contact_status_created_idx").on(table.status, table.createdAt) }))

export const schema = { user, session, account, verification, category, product, productImage, cart, cartItem, address, order, orderItem, favorite, review, contactInquiry }
