INSERT INTO "products" (name, description, price, affiliate_link, image_url, is_active)
VALUES
  (
    'Drain holder for showers with versatile waist belt strap',
    'Essential post-surgery drainage pouch with waist belt strap.',
    35.00,
    'https://amzn.to/3YRyxVz',
    'https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Robe with pockets',
    'Comfortable and soft robe featuring deep pockets.',
    50.00,
    'https://amzn.to/44OxvgY',
    'https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=817&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false
  ),
  (
    'Small and squishy pillows',
    'Cushiony pillows ideal for neck and arm support.',
    20.00,
    'https://amzn.to/4kqJN3r',
    'https://images.unsplash.com/photo-1601880348117-25c1127a95df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false
  ),
  (
    'Lap Desk with Pad',
    'Portable lap desk with padded bottom and device support.',
    45.00,
    'https://amzn.to/4ji3Q3b',
    'https://images.unsplash.com/photo-1603349206294-08e0d7f9b27f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Ice Gloves and Booties for Chemo',
    'Cooling gloves and booties for chemo therapy support.',
    65.00,
    'https://amzn.to/4mnEjrV',
    'https://images.unsplash.com/photo-1593963096583-2335e4fd2f85?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Weighted Heating Pad',
    'Large weighted heating pad for back and neck relief.',
    58.00,
    'https://amzn.to/4ksaQLQ',
    'https://images.unsplash.com/photo-1621624666561-fd2cd9d6b7f1?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Tushy Bidet',
    'Easy-to-install bidet attachment for better hygiene.',
    89.00,
    'https://amzn.to/3YSrfkv',
    'https://images.unsplash.com/photo-1619441207978-d8be85b7f1e5?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Soft and stretchy chemo hats',
    'Breathable and stretchy hats for chemo patients.',
    30.00,
    'https://amzn.to/4jeb3Bs',
    'https://images.unsplash.com/photo-1629796974402-b89ea3e289e9?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Cozy Earth Sheets',
    'Luxuriously soft and breathable bamboo bed sheets.',
    290.00,
    'https://amzn.to/4k8NpaE',
    'https://images.unsplash.com/photo-1588776814546-65f5c9cfaa4e?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  ),
  (
    'Berkey Walter Filter System',
    'High-quality water filter for clean and safe drinking.',
    350.00,
    'https://amzn.to/3H4AdVB',
    'https://images.unsplash.com/photo-1588776814546-65f5c9cfaa4e?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false
  );


    INSERT INTO "product_types" (name, description)
  VALUES
    (
      'Treatment Needs',
      'Services or products supporting essential health and treatment-related needs.'
    ),
    (
      'Comfort, Warmth & Spoiling',
      'Items or experiences that offer comfort, luxury, or pampering.'
    ),
    (
      'Clean Living',
      'Services or goods promoting a healthy and toxin-free environment.'
    ),
    (
      'Entertainment & Distraction',
      'Activities or media that provide joy, engagement, or mental relief.'
    ),
    (
      'Self-Care Essentials',
      'Basic items or services to support mental and physical well-being.'
    ),
    (
      'Sparks of Joy & Gentle Reminders',
      'Thoughtful touches that inspire joy or emotional uplift.'
    ),
    (
      'Gift Cards',
      'Flexible gifting options that allow recipients to choose what they need.'
    ),
    (
      'Memberships and Subscription Services',
      'Recurring services such as media, health, or wellness subscriptions.'
    );

    INSERT INTO "products" (name, description, price, affiliate_link, image_url, is_active,category)
VALUES
  (
    'Ice Gloves and Booties for Chemo',
    'Ice Gloves and Booties for Chemo.',
    35.00,
    'https://amzn.to/4mnEjrV',
    'https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '1'
  ),
  (
    'Weighted Heating Pad',
    'Weighted Heating Pad.',
    50.00,
    'https://amzn.to/4ksaQLQ',
    'https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=817&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false,
    '1'
  ),
  (
    'Tushy Bidet',
    'Cushiony pillows ideal for neck and arm support.',
    20.00,
    'https://amzn.to/3YSrfkv',
    'https://images.unsplash.com/photo-1601880348117-25c1127a95df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false,
    '1'
  ),
  (
    'Soft and stretchy chemo hats',
    'Portable lap desk with padded bottom and device support.',
    45.00,
    'https://amzn.to/4jeb3Bs',
    'https://images.unsplash.com/photo-1603349206294-08e0d7f9b27f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '1'
  ),
  (
    'Berkey Walter Filter System',
    'Cooling gloves and booties for chemo therapy support.',
    65.00,
    'https://amzn.to/3H4AdVB',
    'https://images.unsplash.com/photo-1593963096583-2335e4fd2f85?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '1'
  ),
  (
    'Drain holder for showers with versatile waist belt strap',
    'Drain holder for showers with versatile waist belt strap.',
    58.00,
    'https://amzn.to/3YRyxVz',
    'https://images.unsplash.com/photo-1621624666561-fd2cd9d6b7f1?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '1'
  ),
  (
    'Robe with pockets',
    'Easy-to-install bidet attachment for better hygiene.',
    89.00,
    'https://amzn.to/44OxvgY',
    'https://images.unsplash.com/photo-1619441207978-d8be85b7f1e5?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '1'
  );

  INSERT INTO "products" (name, description, price, affiliate_link, image_url, is_active,category)
VALUES
  (
    'Cozy Earth Sheets',
    'Cozy Earth Sheets.',
    35.00,
    'https://amzn.to/4k8NpaE',
    'https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '2'
  ),
  (
    'Small and squishy pillows',
    'Weighted Heating Pad.',
    50.00,
    'https://amzn.to/4kqJN3r',
    'https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=817&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false,
    '2'
  ),
  (
    'Lap Desk with Pad',
    'Cushiony pillows ideal for neck and arm support.',
    20.00,
    'https://amzn.to/4ji3Q3b',
    'https://images.unsplash.com/photo-1601880348117-25c1127a95df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false,
    '2'
  );

  INSERT INTO "products" (name, description, price, affiliate_link, image_url, is_active,category)
VALUES
  (
    'Salt and Stone Lotion',
    'Salt and Stone Lotion.',
    35.00,
    'https://amzn.to/449UJgs',
    'https://images.unsplash.com/photo-1509195605820-8eb07b921387?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0',
    false,
    '5'
  ),
  (
    'Small and squishy pillows',
    'Weighted Heating Pad.',
    50.00,
    'https://amzn.to/4kqJN3r',
    'https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=817&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false,
    '5'
  ),
  (
    'Lap Desk with Pad',
    'Cushiony pillows ideal for neck and arm support.',
    20.00,
    'https://amzn.to/4ji3Q3b',
    'https://images.unsplash.com/photo-1601880348117-25c1127a95df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    false,
    '5'
  );

  INSERT INTO "products" (name, description, price, affiliate_link, image_url, is_active,category)
VALUES
  (
    'Starbucks',
    'Star buck gift card for others.',
    25.00,
    'https://www.starbucks.com/gift/00000613',
    'https://app.starbucks.com/weblx/images/social/summary_square.png',
    false,
    '7'
  ),
  (
    'Starbucks My Treat',
    'Star buck gift card for others.',
    50.00,
    'https://www.starbucks.com/gift/00000323',
    'https://app.starbucks.com/weblx/images/social/summary_square.png',
    false,
    '7'
  );