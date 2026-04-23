export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const html = await response.text();

    const getMeta = (property) => {
      const match = html.match(
        new RegExp(
          `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
          "i"
        )
      );
      return match ? match[1] : null;
    };

    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const rawTitle = getMeta("og:title") || titleMatch?.[1] || null;

    let cleanedTitle = rawTitle
      ?.replace(/^Amazon\.com:\s*/i, "")
      ?.replace(/\s*:\s*[^:]+$/, "")
      ?.trim();

    if (cleanedTitle) {
      const words = cleanedTitle.split(" ");
      if (words.length > 1) {
        cleanedTitle = words.slice(1).join(" ");
      }
    }
    const title = cleanedTitle;

    const description =
      getMeta("og:description") ||
      (html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
      )?.[1] ??
        null);

    let image = getMeta("og:image");

    if (!image) {
      const landingImgMatch = html.match(
        /<img[^>]+id=["']landingImage["'][^>]+>/i
      );
      if (landingImgMatch) {
        const imgTag = landingImgMatch[0];

        const oldHiresMatch = imgTag.match(/data-old-hires=["']([^"']+)["']/);
        if (oldHiresMatch) {
          image = oldHiresMatch[1];
        }

        if (!image) {
          const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
          if (srcMatch) {
            image = srcMatch[1];
          }
        }

        if (!image) {
          const dynamicImageMatch = imgTag.match(
            /data-a-dynamic-image=["']([^"']+)["']/
          );
          if (dynamicImageMatch) {
            try {
              const decoded = dynamicImageMatch[1].replace(/&quot;/g, '"');
              const dynamicJson = JSON.parse(decoded);
              const urls = Object.keys(dynamicJson);
              if (urls.length > 0) image = urls[0];
            } catch (err) {
              console.warn("Failed to parse data-a-dynamic-image");
            }
          }
        }
      }
    }

    // get price from meta tags
    let price =
      getMeta("product:price:amount") || getMeta("og:price:amount") || null;

    // get price from JSON-LD (schema.org) data
    if (!price) {
      const ldJsonMatches = [
        ...html.matchAll(
          /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
        ),
      ];
      for (const match of ldJsonMatches) {
        try {
          const jsonText = match[1].trim();
          const data = JSON.parse(jsonText);
          if (Array.isArray(data)) {
            for (const item of data) {
              if (item.offers?.price) {
                price = item.offers.price;
                break;
              }
            }
          } else if (data.offers?.price) {
            price = data.offers.price;
            break;
          }
        } catch (err) {
          console.warn("Failed to parse JSON-LD", err);
        }
        if (price) break;
      }
    }

    if (!price) {
      const pricePatterns = [
        /id=["']priceblock_ourprice["'][^>]*>\s*\$?([\d.,]+)/i,
        /id=["']priceblock_dealprice["'][^>]*>\s*\$?([\d.,]+)/i,
        /id=["']price_inside_buybox["'][^>]*>\s*\$?([\d.,]+)/i,
        /class=["'][^"']*price[^"']*["'][^>]*>\s*\$?([\d.,]+)/i,
      ];
      for (const pattern of pricePatterns) {
        const match = html.match(pattern);
        if (match) {
          price = match[1];
          break;
        }
      }
    }

    return res.status(200).json({ title, image, description, price });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch metadata" });
  }
}
