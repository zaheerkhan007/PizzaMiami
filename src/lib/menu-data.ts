export type SizedPrice = {
  s10?: number;  // 10 inch
  s12?: number;  // 12 inch
  s14?: number;  // 14 inch
  small?: number;
  medium?: number;
  large?: number;
  lb14?: number;
  lb12?: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | SizedPrice;
  category: string;
  popular?: boolean;
  emoji?: string;
  sizeLabels?: string[];  // human-readable size names
};

export type Category = {
  id: string;
  label: string;
  emoji: string;
};

export const categories: Category[] = [
  { id: 'pizza',          label: 'Fresh Pizza',       emoji: '🍕' },
  { id: 'garlic-bread',   label: 'Garlic Bread',       emoji: '🥖' },
  { id: 'deal-meals',     label: 'Deal Meals',         emoji: '🤝' },
  { id: 'cheesess-meals', label: 'Meal Deals',         emoji: '🍗' },
  { id: 'starters',       label: 'Starters',           emoji: '🍟' },
  { id: 'fried-chicken',  label: 'Fried Chicken',      emoji: '🍗' },
  { id: 'burgers',        label: 'Burgers & Wraps',    emoji: '🍔' },
  { id: 'best-burger',    label: 'Best Burgers',       emoji: '🏆' },
  { id: 'peri-peri',      label: 'Peri Peri Chicken',  emoji: '🔥' },
  { id: 'pasta',          label: 'Pasta',              emoji: '🍝' },
  { id: 'kababs',         label: 'Kababs',             emoji: '🥙' },
  { id: 'jacket-potato',  label: 'Jacket Potato',      emoji: '🥔' },
  { id: 'kids',           label: 'Kids Menu',          emoji: '👶' },
  { id: 'desserts',       label: 'Desserts & Drinks',  emoji: '🍦' },
  { id: 'milkshakes',     label: 'Milk Shakes',        emoji: '🥤' },
];

// Helper: is this item multi-sized?
export const hasSizes = (price: MenuItem['price']): price is SizedPrice =>
  typeof price !== 'number';

// Get all size options as { label, price } array
export const getSizeOptions = (price: MenuItem['price']): { label: string; price: number }[] => {
  if (typeof price === 'number') return [{ label: 'Regular', price }];
  const opts: { label: string; price: number }[] = [];
  if (price.s10  !== undefined) opts.push({ label: '10"',    price: price.s10 });
  if (price.s12  !== undefined) opts.push({ label: '12"',    price: price.s12 });
  if (price.s14  !== undefined) opts.push({ label: '14"',    price: price.s14 });
  if (price.small  !== undefined) opts.push({ label: 'Small',  price: price.small });
  if (price.medium !== undefined) opts.push({ label: 'Medium', price: price.medium });
  if (price.large  !== undefined) opts.push({ label: 'Large',  price: price.large });
  if (price.lb14   !== undefined) opts.push({ label: '1/4 lb', price: price.lb14 });
  if (price.lb12   !== undefined) opts.push({ label: '1/2 lb', price: price.lb12 });
  return opts;
};

export const getMinPrice = (price: MenuItem['price']): number => {
  if (typeof price === 'number') return price;
  const nums = Object.values(price).filter((v): v is number => typeof v === 'number');
  return nums.length ? Math.min(...nums) : 0;
};

export const formatPrice = (n: number) => `£${n.toFixed(2)}`;

export const menuItems: MenuItem[] = [
  // ── FRESH PIZZA ──────────────────────────────────────────────
  { id:'p1',  name:'Cheese & Tomato',                          description:'Classic cheese and tomato base',                              price:{ s10:3.99, s12:5.49, s14:7.49  }, category:'pizza', popular:true,  emoji:'🍕' },
  { id:'p2',  name:'Pepperoni',                                description:'Loaded with pepperoni slices',                               price:{ s10:6.49, s12:7.99, s14:10.99 }, category:'pizza', popular:true,  emoji:'🍕' },
  { id:'p3',  name:'Chicken',                                  description:'Tender chicken pieces',                                      price:{ s10:6.49, s12:7.99, s14:10.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p4',  name:'Mushroom',                                 description:'Fresh mushroom pizza',                                       price:{ s10:6.49, s12:7.99, s14:10.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p5',  name:'BBQ Chicken',                              description:'BBQ sauce with chicken',                                     price:{ s10:6.49, s12:7.99, s14:10.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p6',  name:'Half & Half',                              description:'Two flavours in one',                                        price:{ s10:6.49, s12:7.99, s14:10.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p7',  name:'Tuna & Sweetcorn',                         description:'Tuna and sweetcorn on a classic base',                       price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p8',  name:'Bolognese',                                description:'Rich bolognese sauce on pizza base',                         price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p9',  name:'Chicken & Sweetcorn',                      description:'Chicken with sweetcorn',                                     price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p10', name:'Pepperoni & Pineapple',                    description:'Sweet and savoury combo',                                    price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p11', name:'Hawaiian Turkey Ham & Pineapple',          description:'Classic Hawaiian with turkey ham',                           price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p12', name:'Mexican Spicy Meat & Jalapeños',           description:'Spicy Mexican style',                                        price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza', popular:true,  emoji:'🍕' },
  { id:'p13', name:'Donner & Cheese',                          description:'Donner meat with melted cheese',                             price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p14', name:'Sea Food – Tuna, Prawns, Anchovies',       description:'Seafood lovers special',                                     price:{ s10:7.49, s12:9.99, s14:12.49 }, category:'pizza',               emoji:'🍕' },
  { id:'p15', name:'Farmhouse',                                description:'Turkey ham, mushrooms, onion & pepperoni',                   price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p16', name:'American',                                 description:'Onion, pepperoni & peppers',                                 price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p17', name:'3 Cheese – Mozzarella, Gorgonzola & Feta', description:'Three cheese blend',                                        price:{ s10:6.99, s12:8.99, s14:11.99 }, category:'pizza',               emoji:'🍕' },
  { id:'p18', name:'Vegetarian',                               description:'Onion, sweetcorn, mushroom & peppers',                       price:{ s10:7.99, s12:10.49, s14:12.99}, category:'pizza',               emoji:'🍕' },
  { id:'p19', name:'Deluxe',                                   description:'Peppers, mushroom, onion, pepperoni & spicy meat',           price:{ s10:7.99, s12:10.49, s14:12.99}, category:'pizza', popular:true,  emoji:'🍕' },
  { id:'p20', name:'Hot & Spicy',                              description:'Onion, pepperoni, spicy meat & jalapeños',                   price:{ s10:7.99, s12:10.49, s14:12.99}, category:'pizza',               emoji:'🍕' },
  { id:'p21', name:'Mighty Meaty',                             description:'Chicken, pepperoni, ham & spicy meat',                       price:{ s10:7.99, s12:10.49, s14:12.99}, category:'pizza',               emoji:'🍕' },
  { id:'p22', name:'Miami Special',                            description:'Onion, mushroom, turkey ham, pepperoni, spicy meat, chicken, olive & jalapeños', price:{ s10:9.99, s12:11.99, s14:13.99}, category:'pizza', popular:true, emoji:'🍕' },

  // ── GARLIC BREAD ─────────────────────────────────────────────
  { id:'gb1', name:'Garlic Bread Plain',                       description:'Classic garlic bread',                                       price:{ s10:3.99, s12:4.99, s14:6.99  }, category:'garlic-bread', emoji:'🥖' },
  { id:'gb2', name:'Garlic Bread with Cheese',                 description:'Garlic bread with melted cheese',                            price:{ s10:5.49, s12:7.99, s14:9.99  }, category:'garlic-bread', emoji:'🥖' },
  { id:'gb3', name:'Garlic Bread – Cheese, Mushroom & Onion',  description:'Topped with cheese, mushroom & onion',                      price:{ s10:6.49, s12:8.99, s14:10.99 }, category:'garlic-bread', emoji:'🥖' },
  { id:'gb4', name:'Garlic Chicken – Chicken, Mushroom & Onion',description:'Chicken with mushroom and onion',                          price:{ s10:7.49, s12:9.49, s14:11.49 }, category:'garlic-bread', popular:true, emoji:'🥖' },
  { id:'gb5', name:'Garlic Folded – Cheese, Donner or 1 Topping',description:'Folded garlic bread with your choice',                    price:{ s10:7.99, s12:9.99, s14:11.99 }, category:'garlic-bread', emoji:'🥖' },

  // ── DEAL MEALS ───────────────────────────────────────────────
  { id:'dm1',  name:'Pizza Meal 1',         description:'10" Pizza with 2 toppings, Fries & a Can of Pepsi',                             price:7.49,  category:'deal-meals', emoji:'🤝' },
  { id:'dm2',  name:'Pizza Meal 2',         description:'2×10" Pizza with 2 toppings, 10" Garlic Bread with Cheese, 2 Fries & 2 Cans',  price:15.99, category:'deal-meals', popular:true, emoji:'🤝' },
  { id:'dm3',  name:'Pizza Meal 3',         description:'2×12" Pizza with 2 toppings, 2 Fries & 2 Cans of Pepsi',                       price:17.99, category:'deal-meals', emoji:'🤝' },
  { id:'dm4',  name:'Family Meal',          description:'14" Pizza with 3 toppings, 12" Garlic Bread with Cheese, 2 Fries & Bottle',    price:19.99, category:'deal-meals', popular:true, emoji:'🤝' },
  { id:'dm5',  name:'Kebab Meal',           description:'4× Hot Donner Kebab, 10" Garlic Bread, Fries & 2 Cans of Pepsi',               price:10.99, category:'deal-meals', emoji:'🤝' },
  { id:'dm6',  name:'Burger Meal',          description:'2× ¼ lb Cheeseburger, 10" Garlic Burger, 2 Fries & 2 Cans of Pepsi',          price:12.49, category:'deal-meals', emoji:'🤝' },
  { id:'dm7',  name:'Burger Sandwich Meal', description:'Chicken Sandwich, Fries & a Can of Pepsi',                                     price:5.49,  category:'deal-meals', emoji:'🤝' },
  { id:'dm8',  name:'Chicken Feast',        description:'3 Pcs of Chicken, Fries & a Can of Pepsi',                                     price:6.49,  category:'deal-meals', emoji:'🤝' },
  { id:'dm9',  name:'Chicken Dinner',       description:'2 Pcs of Chicken, Fries & a Can of Pepsi',                                     price:4.49,  category:'deal-meals', emoji:'🤝' },
  { id:'dm10', name:'Hot Wings Meal',       description:'5 Hot Wings, Fries & a Can of Pepsi',                                          price:5.99,  category:'deal-meals', emoji:'🤝' },
  { id:'dm11', name:'Donner Meal',          description:'Donner Kebab, Fries & a Can of Pepsi',                                         price:6.49,  category:'deal-meals', emoji:'🤝' },
  { id:'dm12', name:'Chicken Wrap Meal',    description:'Chicken Wrap, Fries & a Can of Pepsi',                                         price:5.49,  category:'deal-meals', emoji:'🤝' },
  { id:'dm13', name:'Donner Wrap Meal',     description:'Donner Wrap, Fries & a Can of Pepsi',                                          price:4.99,  category:'deal-meals', emoji:'🤝' },
  { id:'dm14', name:'Sky Scraper Meal',     description:'Chicken breast, Slice of Cheese, 3 Onion Rings, Fries & a Can of Pepsi',       price:6.49,  category:'deal-meals', emoji:'🤝' },

  // ── CHEESESS MEALS ───────────────────────────────────────────
  { id:'cm1',  name:'Chick Meal 1',         description:'¼ chicken, 6 wings, chips, 1 coleslaw & 2 cans',                               price:11.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm2',  name:'Chick Meal 2',         description:'Full chicken, 8 wings, 2 chips, 1 coleslaw & 2 cans',                          price:15.99, category:'cheesess-meals', popular:true, emoji:'🍗' },
  { id:'cm3',  name:'Double Chick Meal',    description:'2 full peri chicken, 8 wings, 4 chips, 2 coleslaw & 4 cans',                   price:27.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm4',  name:'Wings Meal',           description:'10 Wings, 2 chips, 2 sauces, salad & 2 drinks',                                price:11.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm5',  name:'Wings Meal 2',         description:'20 Wings, 4 chips, 2 sauces, salad & 4 drinks',                                price:21.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm6',  name:'Love Meal',            description:'2 peri chicken, 8 peri wings, 2 chips, 2 sauces, salad & 2 cans',              price:19.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm7',  name:'Friends Meal',         description:'3 peri burgers, 12 wings, 3 chips, 3 sauces, 3 cans',                          price:24.99, category:'cheesess-meals', popular:true, emoji:'🍗' },
  { id:'cm8',  name:'Brothers Meal',        description:'4 quarter peri chicken, 12 wings, 4 chips, 2 coleslaw, 2 sauces & 4 cans',    price:24.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm9',  name:'Hot Meal',             description:'¼ peri chicken, 6 wings, 4 strips, 10" pizza, 2 coleslaw, 2 chips, 2 pepsi',   price:19.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm10', name:'Special Meal',         description:'½ peri chicken, 8 wings, 6 strips, 10" pizza, 2 chips, 2 coleslaw, 2 pepsi',   price:24.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm11', name:'Family Chicken Meal',  description:'Full peri chicken, 12" pizza with 3 toppings, fillet burger, 5 wings, 2 coleslaw, 3ltr drink', price:34.99, category:'cheesess-meals', emoji:'🍗' },
  { id:'cm12', name:'Snacks Meal',          description:'6 chicken strips, 10 popcorn, 12 wings, 3 reg fries, 3 dips',                  price:15.99, category:'cheesess-meals', emoji:'🍗' },

  // ── STARTERS ─────────────────────────────────────────────────
  { id:'s1',  name:'Fries',                 description:'Crispy golden fries',                  price:{ small:1.70, large:2.29 }, category:'starters', emoji:'🍟' },
  { id:'s2',  name:'Cheesy Chips',          description:'Chips smothered in cheese',            price:{ small:2.29, large:3.29 }, category:'starters', emoji:'🍟' },
  { id:'s3',  name:'Chips Barm',            description:'Chips in a soft barm',                price:1.20, category:'starters', emoji:'🍟' },
  { id:'s4',  name:'8 Onion Rings',         description:'Crispy battered onion rings',          price:2.00, category:'starters', emoji:'🧅' },
  { id:'s5',  name:'4 Veg Spring Rolls',    description:'Vegetable spring rolls',               price:3.50, category:'starters', emoji:'🌯' },
  { id:'s6',  name:'4 Meat Spring Rolls',   description:'Meat filled spring rolls',             price:3.50, category:'starters', emoji:'🌯' },
  { id:'s7',  name:'6 Jalapeño Cheese Bites',description:'Cheesy jalapeño bites',              price:3.50, category:'starters', emoji:'🌶️' },
  { id:'s8',  name:'Tub of Coleslaw',       description:'Creamy coleslaw',                      price:1.00, category:'starters', emoji:'🥗' },
  { id:'s9',  name:'Side Salad',            description:'Fresh side salad',                     price:1.50, category:'starters', emoji:'🥗' },
  { id:'s10', name:'Garlic Pitta',          description:'Toasted garlic pitta bread',           price:1.50, category:'starters', emoji:'🫓' },
  { id:'s11', name:'Naan Bread',            description:'Soft naan bread',                      price:1.00, category:'starters', emoji:'🫓' },
  { id:'s12', name:'Hot Sauce / Curry / Gravy', description:'Choice of dipping sauce',         price:1.50, category:'starters', emoji:'🥣' },
  { id:'s13', name:'Dip Sauce',             description:'Choice of dip',                        price:1.00, category:'starters', emoji:'🥣' },

  // ── FRIED CHICKEN ─────────────────────────────────────────────
  { id:'fc1', name:'1 Pc of Chicken',        description:'One piece of crispy fried chicken',    price:1.99, category:'fried-chicken', emoji:'🍗' },
  { id:'fc2', name:'2 Pcs of Chicken',       description:'Two pieces of crispy fried chicken',   price:3.49, category:'fried-chicken', emoji:'🍗' },
  { id:'fc3', name:'3 Pcs of Chicken',       description:'Three pieces of crispy fried chicken', price:4.49, category:'fried-chicken', emoji:'🍗' },
  { id:'fc4', name:'5 Chicken Nuggets',      description:'Five crispy nuggets',                  price:2.99, category:'fried-chicken', emoji:'🍗' },
  { id:'fc5', name:'10 Chicken Nuggets',     description:'Ten crispy nuggets',                   price:5.49, category:'fried-chicken', emoji:'🍗' },
  { id:'fc6', name:'5 Hot Chicken Nuggets',  description:'Five spicy hot nuggets',               price:3.49, category:'fried-chicken', emoji:'🍗' },
  { id:'fc7', name:'10 Hot Chicken Nuggets', description:'Ten spicy hot nuggets',                price:5.99, category:'fried-chicken', emoji:'🍗' },
  { id:'fc8', name:'6 Hot Wings',            description:'Six spicy chicken wings',              price:4.49, category:'fried-chicken', popular:true, emoji:'🍗' },
  { id:'fc9', name:'Popcorn Chicken',        description:'Bite-size crispy popcorn chicken',     price:3.99, category:'fried-chicken', emoji:'🍗' },

  // ── BURGERS & WRAPS ──────────────────────────────────────────
  { id:'bw1',  name:'Peri Peri Chicken Burger',   description:'Peri Peri chicken fillet, cheese, lettuce & mayo',                               price:4.49, category:'burgers', popular:true, emoji:'🍔' },
  { id:'bw2',  name:'Peri Peri Supreme Burger',   description:'Peri Peri chicken fillet, hashbrown, cheese, lettuce & mayo',                    price:5.49, category:'burgers', emoji:'🍔' },
  { id:'bw3',  name:'Peri Peri Mega Mix Burger',  description:'Peri Peri chicken fillet, beef patty, cheese, lettuce & mayo',                   price:5.99, category:'burgers', popular:true, emoji:'🍔' },
  { id:'bw4',  name:'Peri Peri Tex Mex Burger',   description:'Peri Peri chicken fillet, jalapeños, lettuce & mayo',                            price:4.99, category:'burgers', emoji:'🍔' },
  { id:'bw5',  name:'Peri Peri Ringer Burger',    description:'Peri Peri chicken fillet, onion rings, cheese, lettuce & mayo',                  price:4.99, category:'burgers', emoji:'🍔' },
  { id:'bw6',  name:'Peri Peri King Burger',      description:'3 Peri Peri chicken fillets, cheese, lettuce & mayo',                           price:6.99, category:'burgers', emoji:'🍔' },
  { id:'bw7',  name:'Peri Peri Nacho Burger',     description:'Peri Peri fillet, onion rings, nachos, cheese, lettuce & mayo',                  price:4.99, category:'burgers', emoji:'🍔' },
  { id:'bw8',  name:'Strip Burger',               description:'Peri Peri strips, lettuce & mayo',                                               price:3.99, category:'burgers', emoji:'🍔' },
  { id:'bw9',  name:'Peri Peri Chicken Wrap',     description:'Peri Peri chicken, cheese, lettuce & mayo',                                      price:4.49, category:'burgers', emoji:'🌯' },
  { id:'bw10', name:'Peri Peri Fire Wrap',        description:'Peri Peri chicken, jalapeños, cheese & mayo',                                    price:4.99, category:'burgers', emoji:'🌯' },
  { id:'bw11', name:'Peri Peri Supreme Wrap',     description:'Peri Peri strip, hashbrown, cheese, lettuce & mayo',                             price:5.49, category:'burgers', emoji:'🌯' },
  { id:'bw12', name:'Loaded Meal 1',              description:'Peri chicken fillet, 3 peri wings, cheese, lettuce & mayo',                      price:6.49, category:'burgers', emoji:'🍔' },
  { id:'bw13', name:'Loaded Meal 2',              description:'Peri chicken fillet, 2 peri strips, cheese, lettuce & mayo',                     price:6.49, category:'burgers', emoji:'🍔' },
  { id:'bw14', name:'Donner Wrap',                description:'Classic donner wrap',                                                             price:3.99, category:'burgers', emoji:'🌯' },
  { id:'bw15', name:'Chicken Kebab Wrap',         description:'Chicken kebab in a wrap',                                                         price:5.49, category:'burgers', emoji:'🌯' },
  { id:'bw16', name:'Chicken Strip Wrap',         description:'Chicken strips in a wrap',                                                        price:3.99, category:'burgers', emoji:'🌯' },
  { id:'bw17', name:'Mix Wrap – Chicken & Donner',description:'Mixed chicken and donner wrap',                                                   price:5.99, category:'burgers', emoji:'🌯' },

  // ── BEST BURGERS ─────────────────────────────────────────────
  { id:'bb1', name:'Beef Burger',      description:'Classic beef burger',                        price:{ lb14:3.49, lb12:4.99 }, category:'best-burger', emoji:'🍔' },
  { id:'bb2', name:'Chicken Burger',   description:'Crispy chicken burger',                      price:{ lb14:3.49, lb12:4.99 }, category:'best-burger', emoji:'🍔' },
  { id:'bb3', name:'Cheese Burger',    description:'Classic cheeseburger',                       price:{ lb14:3.79, lb12:5.49 }, category:'best-burger', emoji:'🍔' },
  { id:'bb4', name:'Hawaiian Burger',  description:'Hawaiian style burger',                      price:{ lb14:3.99, lb12:5.49 }, category:'best-burger', emoji:'🍔' },
  { id:'bb5', name:'Donner Burger',    description:'Donner meat burger',                         price:{ lb14:3.29, lb12:4.49 }, category:'best-burger', emoji:'🍔' },
  { id:'bb6', name:'Veggie Burger',    description:'Vegetarian burger',                          price:{ lb14:3.29, lb12:4.49 }, category:'best-burger', emoji:'🍔' },
  { id:'bb7', name:'Special Burger',   description:'Cheese burger or Chicken Burger with Donner',price:4.99, category:'best-burger', popular:true, emoji:'🍔' },
  { id:'bb8', name:'King Size Burger', description:'Triple Cheese Burger or Chicken Burger',     price:6.79, category:'best-burger', emoji:'🍔' },

  // ── PERI PERI CHICKEN ─────────────────────────────────────────
  { id:'pp1', name:'¼ Chicken Meal',         description:'Served with fries & drink',                                                   price:5.49, category:'peri-peri', emoji:'🔥' },
  { id:'pp2', name:'½ Chicken Meal',         description:'Served with fries & drink',                                                   price:7.49, category:'peri-peri', popular:true, emoji:'🔥' },
  { id:'pp3', name:'Full Chicken Meal',      description:'Served with fries & drink',                                                   price:9.99, category:'peri-peri', emoji:'🔥' },
  { id:'pp4', name:'Peri Peri Wings Meal',   description:'6 Peri wings, fries & drink',                                                price:6.49, category:'peri-peri', emoji:'🔥' },
  { id:'pp5', name:'Peri Peri Strips Meal',  description:'6 Peri Strips, fries & drink',                                               price:6.49, category:'peri-peri', emoji:'🔥' },
  { id:'pp6', name:'Peri Peri Combo Meal',   description:'¼ Peri chicken, fries & drink',                                              price:7.49, category:'peri-peri', emoji:'🔥' },
  { id:'pp7', name:'Peri Peri Chicken Nachos',description:'Crunchy nachos, peri peri chicken, salsa, sour cream, jalapeños & cheese',  price:5.99, category:'peri-peri', emoji:'🔥' },

  // ── PASTA ────────────────────────────────────────────────────
  { id:'pa1', name:'Spaghetti Bolognese', description:'Classic spaghetti with Bolognese sauce', price:6.99, category:'pasta', emoji:'🍝' },
  { id:'pa2', name:'Lasagne Bolognese',   description:'Bolognese sauce & cheese',               price:6.99, category:'pasta', emoji:'🍝' },
  { id:'pa3', name:'Kapsalon',            description:'Fried donner, cheese & choice of sauce', price:5.49, category:'pasta', emoji:'🍝' },

  // ── KABABS ───────────────────────────────────────────────────
  { id:'k1', name:'Donner Kebab',              description:'Classic donner kebab',                          price:{ small:4.49, large:6.49 }, category:'kababs', emoji:'🥙' },
  { id:'k2', name:'Donner Meat & Chips',       description:'Donner meat with chips',                        price:{ small:4.49, large:5.99 }, category:'kababs', emoji:'🥙' },
  { id:'k3', name:'Portion of Donner',         description:'Portion of donner meat',                        price:{ small:4.99, large:6.99 }, category:'kababs', emoji:'🥙' },
  { id:'k4', name:'Chicken Kebab',             description:'Grilled chicken kebab',                         price:{ small:6.49, large:7.99 }, category:'kababs', popular:true, emoji:'🥙' },
  { id:'k5', name:'Shish Kebab',               description:'Traditional shish kebab',                       price:{ small:6.49, large:8.49 }, category:'kababs', emoji:'🥙' },
  { id:'k6', name:'Mix Kebab – Chicken & Donner',description:'Mixed chicken and donner kebab',              price:8.49, category:'kababs', emoji:'🥙' },
  { id:'k7', name:'Miami Special Kebab',        description:'Donner, chicken, shish, chips & naan',         price:11.99, category:'kababs', popular:true, emoji:'🥙' },

  // ── JACKET POTATO ────────────────────────────────────────────
  { id:'jp1', name:'Jacket Potato – Plain',         description:'Plain baked jacket potato',                           price:2.50, category:'jacket-potato', emoji:'🥔' },
  { id:'jp2', name:'Jacket Potato – Extra Topping', description:'Add tuna, sweetcorn, cheese or beans – 50p each',    price:3.00, category:'jacket-potato', emoji:'🥔' },

  // ── KIDS ─────────────────────────────────────────────────────
  { id:'sb1', name:'Snack Box',              description:'3 Strip, 3 Onion Rings, 3 Nuggets, 5 Popcorn Chicken, Fries & a Can of Pepsi', price:7.99, category:'kids', emoji:'📦' },
  { id:'km1', name:'Kids PopCorn Chicken',   description:'Served with Chips & Capri-Sun',       price:4.99, category:'kids', emoji:'👶' },
  { id:'km2', name:'7" Cheese & Tomato Pizza',description:'Served with Chips & Capri-Sun',      price:4.99, category:'kids', emoji:'👶' },
  { id:'km3', name:'5 Chicken Nuggets – Kids',description:'Served with Chips & Capri-Sun',     price:4.99, category:'kids', emoji:'👶' },
  { id:'km4', name:'Donner Burger – Kids',   description:'Served with Chips & Capri-Sun',       price:4.99, category:'kids', emoji:'👶' },

  // ── DESSERTS & DRINKS ─────────────────────────────────────────
  { id:'dd1', name:'Yazoo',             description:'Coke, Diet Coke, Pepsi, Fanta, 7UP',                                   price:1.49, category:'desserts', emoji:'🥤' },
  { id:'dd2', name:'Chocolate Gateau',  description:'Rich chocolate cake slice',                                             price:1.99, category:'desserts', emoji:'🍰' },
  { id:'dd3', name:'Cheese Cake',       description:'Creamy cheesecake slice',                                               price:1.99, category:'desserts', emoji:'🍰' },
  { id:'dd4', name:'Ice Cream',         description:'Classic ice cream',                                                    price:2.49, category:'desserts', emoji:'🍦' },
  { id:'dd5', name:'Can',              description:'Coke, Diet Coke, Pepsi, Fanta, Cherry Coke, 7UP, Rio, Vimto, Tango, Dr Pepper', price:1.20, category:'desserts', emoji:'🥤' },
  { id:'dd6', name:'Large Bottle',      description:'Coke, Diet Coke, Pepsi, Fanta, 7UP',                                   price:2.99, category:'desserts', emoji:'🥤' },
  { id:'dd7', name:'Water',             description:'Still water',                                                           price:0.99, category:'desserts', emoji:'💧' },
  { id:'dd8', name:'Lucozade Orange',   description:'Lucozade orange',                                                       price:1.49, category:'desserts', emoji:'🥤' },
  { id:'dd9', name:'Capri-Sun',         description:'Classic Capri-Sun',                                                     price:0.99, category:'desserts', emoji:'🥤' },

  // ── MILKSHAKES ───────────────────────────────────────────────
  { id:'ms1', name:'Biscoff Milkshake',        description:'Creamy Biscoff milkshake',        price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms2', name:'Mars Milkshake',           description:'Creamy Mars milkshake',           price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms3', name:'Oreo Milkshake',           description:'Creamy Oreo milkshake',           price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms4', name:'Kinder Bueno Milkshake',   description:'Creamy Kinder Bueno milkshake',   price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms5', name:'KitKat Milkshake',         description:'Creamy KitKat milkshake',         price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms6', name:'Twist Milkshake',          description:'Creamy Twist milkshake',          price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms7', name:'Ferrero Rocher Milkshake', description:'Creamy Ferrero Rocher milkshake', price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms8', name:'Snickers Milkshake',       description:'Creamy Snickers milkshake',       price:4.49, category:'milkshakes', emoji:'🥤' },
  { id:'ms9', name:"M&M's Milkshake",          description:"Creamy M&M's milkshake",          price:4.49, category:'milkshakes', emoji:'🥤' },
];
