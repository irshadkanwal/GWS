import TagBadge from "../../components/ui/tag-badge";

function MostPopularPosts() {
  // Array of most popular posts with title, description, tags, and image URL
  const popularPostsData = [
    {
      id: 1,
      title: "The Importance of the Right Support in Difficult Times",
      description:
        "During a health challenge or family crisis, the people around us want to help — but they don't always know how. GiftWellSoon emerges as a real and practical response, transforming good intentions into meaningful and personalized support.",
      tag: ["Support"],
      imageUrl: "blogs/mostPopularPosts/MPP1.png",
    },
    {
      id: 2,
      title:
        "How to Create a GiftWell: A Step-by-Step Guide to Conscious Support",
      description:
        "Discover how to create your own personalized support list in just a few clicks. With GiftWellSoon, you can request exactly what you need — whether it's food, services, or financial help — making it easier for those who want to support you.",
      tag: ["Tutorial", "Giftwell"],
      imageUrl: "blogs/mostPopularPosts/MPP2.png",
    },
    {
      id: 3,
      title: "Why Caregivers Need Help Too",
      description:
        "Being a caregiver is an act of love, but it can also be emotionally and physically exhausting. In this article, we discuss how GiftWellSoon was designed with caregivers in mind — providing structure, support, and comfort.",
      tag: ["Careful", "Support"],
      imageUrl: "blogs/mostPopularPosts/MPP3.png",
    },
  ];

  return (
    <section className="py-16">
      {/* Most Popular Posts Heading */}
      <h2 className="text-4xl font-bold text-gray-900 mb-8">
        Most popular posts
      </h2>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularPostsData.map((article) => (
          <article key={article.id}>
            {/* Article Image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content - positioned below image */}
            <div className="space-y-3">
              {/* Tag Badges - below image, above title */}
              <div className="flex flex-wrap gap-2">
                {article.tag.map((tagName, index) => (
                  <TagBadge key={index}>{tagName}</TagBadge>
                ))}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {article.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MostPopularPosts;
