import db from "@/models";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const products = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: "Expected an array of products" });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api";

  const results = await Promise.all(
    products.map(async (product) => {
      const { name, affiliate_link, category } = product;

      if (!name || !affiliate_link) {
        return {
          success: false,
          error: "Missing required fields: name or affiliate_link",
          product,
        };
      }

      try {
        const metaRes = await fetch(
          `${baseUrl}/product-meta?url=${encodeURIComponent(affiliate_link)}`
        );
        const meta = await metaRes.json();

        if (!metaRes.ok || !meta.title) {
          return {
            success: false,
            error: "Failed to fetch metadata",
            product,
          };
        }

        const newProduct = await db.product.create({
          name,
          description: meta.description || null,
          price: meta.price
            ? parseFloat(meta.price.replace(/[^0-9.]/g, ""))
            : null,
          image_url: meta.image || null,
          affiliate_link,
          is_affiliated: false,
          is_service: false,
          category: category ?? null,
        });

        return {
          success: true,
          product: newProduct,
        };
      } catch (error) {
        console.error("Product creation error:", error);
        return {
          success: false,
          error: "Internal error",
          product,
        };
      }
    })
  );

  return res.status(200).json(results);
}
