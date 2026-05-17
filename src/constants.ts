export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "South Indian" | "North Indian" | "Chinese" | "Snacks" | "Desserts" | "Ice Creams" | "Juices" | "Combos" | "Pizza";
  image: string;
  isVeg: boolean;
  rating: number;
  popularCount?: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // South Indian
  { id: "s1", name: "Masala Dosa", description: "Crispy rice crepe with spiced potato filling and coconut chutney", price: 120, category: "South Indian", isVeg: true, rating: 4.8, image: "https://palatesdesire.com/wp-content/uploads/2022/09/Mysore-masala-dosa-recipe@palates-desire.jpg", popularCount: 150 },
  { id: "s2", name: "Idli Sambar", description: "Soft steamed rice cakes served with aromatic lentil soup", price: 80, category: "South Indian", isVeg: true, rating: 4.5, image: "https://sagarkitchen.com/wp-content/uploads/2023/06/idli-sambar-recipe-sagar-kitchen.jpg", popularCount: 80 },
  { id: "s3", name: "Medhu Vada", description: "Crispy deep fried savory lentil donuts with sambar", price: 90, category: "South Indian", isVeg: true, rating: 4.6, image: "https://tse2.mm.bing.net/th/id/OIP.zP6xte_Kh1sfAMPobCSaLQHaEc?pid=Api&P=0&h=180", popularCount: 65 },
  { id: "s4", name: "Onion Uttapam", description: "Savory thick rice pancake topped with fresh onions and chillies", price: 110, category: "South Indian", isVeg: true, rating: 4.4, image: "https://img.freepik.com/premium-photo/uthappam-uttapam-is-type-dosa-from-south-india-which-is-thicker-with-tomato-onion-chilli-toppings_466689-16199.jpg?w=2000" },
  { id: "s5", name: "Rava Dosa", description: "Lacy, crispy semolina crepe with ginger and cumin", price: 130, category: "South Indian", isVeg: true, rating: 4.7, image: "https://tse3.mm.bing.net/th/id/OIP.lWY4ZvmyxyUW2J4geBn-3AHaHa?pid=Api&P=0&h=180" },
  { id: "s6", name: "Paper Roast Dosa", description: "Extra-large paper-thin crispy dosa", price: 150, category: "South Indian", isVeg: true, rating: 4.8, image: "https://tse1.mm.bing.net/th/id/OIP.qxS9PcbgbDqmWy3phk8FPQHaFO?pid=Api&P=0&h=180" },
  { id: "s7", name: "Paniyaram", description: "Fermented rice and lentil batter balls", price: 100, category: "South Indian", isVeg: true, rating: 4.6, image: "https://tse1.mm.bing.net/th/id/OIP.lerUzNzXzGJD1D9t21trRAHaLH?pid=Api&P=0&h=180" },
  { id: "s8", name: "Poori Masala", description: "Fluffy fried bread served with potato masala", price: 110, category: "South Indian", isVeg: true, rating: 4.7, image: "https://tse3.mm.bing.net/th/id/OIP.IEtjabJyMrmlUnRzKVXhAAHaE8?pid=Api&P=0&h=180" },
  
  // North Indian
  { id: "n1", name: "Butter Chicken", description: "Classic creamy tomato based chicken curry with butter", price: 350, category: "North Indian", isVeg: false, rating: 4.9, image: "https://tse2.mm.bing.net/th/id/OIP.kT3M6dErJ26wHGwcMIZeKQHaKd?pid=Api&P=0&h=180", popularCount: 200 },
  { id: "n2", name: "Paneer Butter Masala", description: "Cottage cheese cubes in a rich and creamy tomato gravy", price: 280, category: "North Indian", isVeg: true, rating: 4.7, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop", popularCount: 120 },
  { id: "n3", name: "Dal Makhani", description: "Slow cooked black lentils with cream and traditional spices", price: 220, category: "North Indian", isVeg: true, rating: 4.8, image: "https://tse3.mm.bing.net/th/id/OIP.8u4Qw0F3yb9xZTCnIyr8xQHaHa?pid=Api&P=0&h=180", popularCount: 140 },
  { id: "n4", name: "Chicken Biryani", description: "Fragrant basmati rice cooked with spiced chicken and authentic dum pukht style", price: 320, category: "North Indian", isVeg: false, rating: 4.9, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop", popularCount: 300 },
  { id: "n5", name: "Tandoori Chicken", description: "Marinated chicken roasted in a traditional clay oven", price: 340, category: "North Indian", isVeg: false, rating: 4.8, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop" },
  { id: "n6", name: "Garlic Naan", description: "Soft leavened bread brushed with garlic butter", price: 60, category: "North Indian", isVeg: true, rating: 4.6, image: "https://tse3.mm.bing.net/th/id/OIP.lVaNqbRQBWDa1je-_EfScAHaLH?pid=Api&P=0&h=180" },
  { id: "n7", name: "Chole Bhature", description: "Spiced chickpea curry paired with large fluffy fried bread", price: 180, category: "North Indian", isVeg: true, rating: 4.7, image: "https://img.freepik.com/free-photo/chole-bhature-is-north-indian-food-dish-combination-chana-masala-bhatura-puri_466689-95486.jpg?w=1380" },
  { id: "n8", name: "Mutton Rogan Josh", description: "Slow-cooked mutton in a rich aromatic gravy", price: 420, category: "North Indian", isVeg: false, rating: 4.9, image: "https://tse2.mm.bing.net/th/id/OIP.e5rhS3LwatOwGTOZ85MiawHaHa?pid=Api&P=0&h=180" },
  { id: "n9", name: "Kadhai Paneer", description: "Paneer cooked with bell peppers and fresh ground spices", price: 270, category: "North Indian", isVeg: true, rating: 4.6, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop" },
  { id: "n10", name: "Malai Kofta", description: "Fried potato and paneer balls in a rich creamy gravy", price: 290, category: "North Indian", isVeg: true, rating: 4.8, image: "https://tse2.mm.bing.net/th/id/OIP.Q9Au0pSwH8dBYHEpXmfO6gHaHa?pid=Api&P=0&h=180" },
  
  // Chinese
  { id: "ch1", name: "Veg Manchurian", description: "Vegetable dumplings in a spicy, tangy soy-based gravy", price: 220, category: "Chinese", isVeg: true, rating: 4.7, image: "https://tse1.mm.bing.net/th/id/OIP.g8lKUZ1F7AldPh4ooQeaIAHaEK?pid=Api&P=0&h=180", popularCount: 90 },
  { id: "ch2", name: "Chilli Chicken", description: "Succulent chicken chunks tossed with bell peppers and onions", price: 280, category: "Chinese", isVeg: false, rating: 4.8, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop" },
  { id: "ch3", name: "Schezwan Noodles", description: "Wok-tossed noodles in a fiery schezwan sauce", price: 210, category: "Chinese", isVeg: true, rating: 4.5, image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop" },
  { id: "ch4", name: "Hakka Noodles", description: "Stir-fried noodles with crisp vegetables", price: 190, category: "Chinese", isVeg: true, rating: 4.4, image: "https://sp.yimg.com/ib/th/id/OIP.AQeMJ32uBb90j9LDmzImpQHaFj?pid=Api&w=148&h=148&c=7&dpr=2&rs=1" },
  { id: "ch5", name: "Spring Rolls", description: "Crispy fried rolls stuffed with seasoned vegetables", price: 160, category: "Chinese", isVeg: true, rating: 4.6, image: "https://s.yimg.com/fz/api/res/1.2/OuLFQeAHCIZ1jAsmSWE_gA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD00MTI7cHhvZmY9NTA7cHlvZmY9MTAwO3E9ODA7c3M9MTt3PTM4OA--/https://i.pinimg.com/736x/51/c7/96/51c796c54912c6a3a54123c0488e8905.jpg" },
  { id: "ch6", name: "Chicken 65", description: "Deep-fried spicy chicken morsels with curry leaves", price: 300, category: "Chinese", isVeg: false, rating: 4.9, image: "https://tse3.mm.bing.net/th/id/OIP.oTYhQBYoVRxesB14v2JzagHaHa?pid=Api&P=0&h=180" },
  
  // Pizza
  { id: "p1", name: "Paneer Tikka Pizza", description: "Fusion pizza topped with spiced paneer and colorful veggies", price: 380, category: "Pizza", isVeg: true, rating: 4.7, image: "https://tse4.mm.bing.net/th/id/OIP.7_CXWSs9-5yuprNqUMUZCwHaE8?pid=Api&P=0&h=180", popularCount: 110 },
  { id: "p2", name: "Truffle Mushroom Pizza", description: "Artisanal thin crust with earthy mushrooms and truffle oil", price: 450, category: "Pizza", isVeg: true, rating: 4.9, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop" },
  { id: "p3", name: "Margherita Pizza", description: "Classic tomato sauce, fresh mozzarella, and basil", price: 320, category: "Pizza", isVeg: true, rating: 4.6, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop" },
  { id: "p4", name: "Farmhouse Pizza", description: "Topped with mushrooms, corn, onions and bell peppers", price: 400, category: "Pizza", isVeg: true, rating: 4.7, image: "https://tse4.mm.bing.net/th/id/OIP.7_CXWSs9-5yuprNqUMUZCwHaE8?pid=Api&P=0&h=180" },
  { id: "p5", name: "Chicken Dominator", description: "Loaded with double chicken and exotic spices", price: 550, category: "Pizza", isVeg: false, rating: 4.8, image: "https://tse1.mm.bing.net/th/id/OIP.5JyxIlQ9eJU0YFCgx1KFhwHaC3?pid=Api&P=0&h=180"},

  // Snacks
  { id: "sn1", name: "Samosa", description: "Crispy pastry with spiced potato and pea filling", price: 40, category: "Snacks", isVeg: true, rating: 4.8, image: "https://tse4.mm.bing.net/th/id/OIP.fDRUA3TTWZk715DkoyWPqQHaEo?pid=Api&P=0&h=180" },
  { id: "sn2", name: "Vada Pav", description: "Spiced potato dumpling in a soft bun", price: 35, category: "Snacks", isVeg: true, rating: 4.7, image: "https://tse2.mm.bing.net/th/id/OIP.m6vgJwieGOOf54c6uCLSBwHaE7?pid=Api&P=0&h=180" },
  { id: "sn3", name: "Pav Bhaji", description: "Mashed vegetable curry served with buttered bread", price: 140, category: "Snacks", isVeg: true, rating: 4.8, image: "https://tse3.mm.bing.net/th/id/OIP.lny37kkcws3qKX0ZCcYRBAHaEK?pid=Api&P=0&h=180" },
  { id: "sn4", name: "Paneer Pakora", description: "Paneer cubes dipped in chickpea batter and deep fried", price: 160, category: "Snacks", isVeg: true, rating: 4.6, image: "https://tse3.mm.bing.net/th/id/OIP.hYhIpMVCLhWbNZlo0YGDcwHaHa?pid=Api&P=0&h=180" },
  { id: "sn5", name: "Bhel Puri", description: "Savory snack made of puffed rice and tangy chutney", price: 70, category: "Snacks", isVeg: true, rating: 4.5, image: "https://tse4.mm.bing.net/th/id/OIP.bkVXHhFi9AVaASuiXpG6PwHaHa?pid=Api&P=0&h=180" },
  { id: "sn6", name: "Loaded Fries", description: "Classic salted crispy potato fries", price: 120, category: "Snacks", isVeg: true, rating: 4.4, image: "https://sp.yimg.com/ib/th/id/OIP.Iuqc5F7FMsnBDBFTXPz8mQHaFj?pid=Api&w=148&h=148&c=7&dpr=2&rs=1" },

  // Desserts
  { id: "d1", name: "Gulab Jamun", description: "Golden milk dumplings soaked in aromatic rose-scented syrup", price: 70, category: "Desserts", isVeg: true, rating: 4.9, image: "https://tse2.mm.bing.net/th/id/OIP.dluRtowiRWM9gcQXEwIEuAHaG9?pid=Api&P=0&h=180", popularCount: 180 },
  { id: "d2", name: "Rasmalai", description: "Soft cottage cheese patties in thick saffron-flavored milk", price: 90, category: "Desserts", isVeg: true, rating: 4.8, image: "https://tse2.mm.bing.net/th/id/OIP.5df8Bbypsd70KRB6Urq4vAHaLH?pid=Api&P=0&h=180" },
  { id: "d3", name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten truffle center", price: 180, category: "Desserts", isVeg: true, rating: 4.8, image: "https://tse4.mm.bing.net/th/id/OIP.j4KI7XktwRyGMcp_iUsUOgHaLH?pid=Api&P=0&h=180" },
  { id: "d4", name: "Gajar Ka Halwa", description: "Traditional carrot pudding with nuts and raisins", price: 120, category: "Desserts", isVeg: true, rating: 4.9, image: "https://tse1.mm.bing.net/th/id/OIP.FewWHBLUQhWKkIZNrcLuFgHaE8?pid=Api&P=0&h=180" },
  { id: "d5", name: "Mango Lassi", description: "Sweet and creamy mango flavored yogurt drink", price: 100, category: "Desserts", isVeg: true, rating: 4.8, image: "https://tse1.mm.bing.net/th/id/OIP.HQEDZzhGVwB5heiL74wQAgHaHa?pid=Api&P=0&h=180" },

  // Ice Creams
  { id: "ic1", name: "Vanilla Bean", description: "Classic vanilla with real bean specks", price: 80, category: "Ice Creams", isVeg: true, rating: 4.5, image: "https://tse2.mm.bing.net/th/id/OIP.bMccXzDfulPxYCpOWeM0fQHaHa?pid=Api&P=0&h=180" },
  { id: "ic2", name: "Belgian Chocolate", description: "Rich and dark chocolate indulgence", price: 120, category: "Ice Creams", isVeg: true, rating: 4.9, image: "https://tse1.mm.bing.net/th/id/OIP.FIqtUo_x6SfhaCUV_tSGcQHaFw?pid=Api&P=0&h=180" },
  { id: "ic3", name: "Butterscotch Blitz", description: "Crunchy butterscotch bits in creamy base", price: 100, category: "Ice Creams", isVeg: true, rating: 4.7, image: "https://tse3.mm.bing.net/th/id/OIP.hSjJFhQbtbdRg8Vc31Uj_wHaFj?pid=Api&P=0&h=180" },

  // Juices
  { id: "j1", name: "Fresh Orange", description: "Pure squeezed orange juice", price: 120, category: "Juices", isVeg: true, rating: 4.6, image: "https://tse4.mm.bing.net/th/id/OIP.50PQZw_e3pxF-mJmPVDV5wHaLG?pid=Api&P=0&h=180" },
  { id: "j2", name: "Cooling Watermelon", description: "Refreshing summer watermelon juice", price: 110, category: "Juices", isVeg: true, rating: 4.7, image: "https://tse2.mm.bing.net/th/id/OIP.ZX1q730AmoD_V3HkPwTM7QHaLH?pid=Api&P=0&h=180" },
  { id: "j3", name: "Mint Lime Soda", description: "Zesty lime with fresh mint and fizz", price: 90, category: "Juices", isVeg: true, rating: 4.8, image: "https://tse1.mm.bing.net/th/id/OIP.VctZ0vhgAJlS20Z9OjE4DwHaE8?pid=Api&P=0&h=180" },

  // Combos
  { id: "c1", name: " Executive Thali", description: "Complete meal with Roti, Dal, Rice, Two Curries, and Sweet", price: 250, category: "Combos", isVeg: true, rating: 4.7, image: "https://raasaahar.in/wp-content/uploads/elementor/thumbs/Veg-Executive-Thali-r0gkrtgtdjg1yamm3t2ychxi3snemaukvkx4bw4w1s.png" },
  { id: "c2", name: "Dosa Combo", description: "Masala Dosa with small Idli, Vada and Coffee", price: 190, category: "Combos", isVeg: true, rating: 4.6, image: "https://img.freepik.com/premium-photo/irresistible-masala-dosa-combo-south-indian-food-masala-dosa-picture-photography_1020697-134095.jpg?w=2000" },
  { id: "c3", name: "Chinese Platter", description: "Manchurian, Noodles, and Spring Roll", price: 350, category: "Combos", isVeg: true, rating: 4.8, image: "https://tse2.mm.bing.net/th/id/OIP.-iUDCIA0Ri2DCTKaAnjbMgHaE8?pid=Api&P=0&h=180" },
  { id: "c4", name: "North Indian Special", description: "Butter Chicken with two Garlic Naan and Coke", price: 450, category: "Combos", isVeg: false, rating: 4.9, image: "https://img-global.cpcdn.com/recipes/4e6759e54cbfedc2/1200x630cq70/photo.jpg" },
  { id: "c5", name: "Snack Feast", description: "Samosa, Vada Pav, and Masala Chai", price: 120, category: "Combos", isVeg: true, rating: 4.7, image: "https://tse1.mm.bing.net/th/id/OIP.3ClJkjjvdqpboNBqWXP1mgHaHa?pid=Api&P=0&h=180" }
];
