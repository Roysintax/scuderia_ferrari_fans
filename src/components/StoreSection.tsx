import { ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Team Racing Jersey',
    category: 'Apparel',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1758499535896-7be3b226d854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBtZXJjaGFuZGlzZSUyMGFwcGFyZWx8ZW58MXx8fHwxNzY1NTQ3MTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    isNew: true,
  },
  {
    id: 2,
    name: 'Racing Cap',
    category: 'Accessories',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1729550249173-f9b9df6f0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXAlMjBoYXR8ZW58MXx8fHwxNzY1NTQ3MTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
  {
    id: 3,
    name: 'Premium Team Jacket',
    category: 'Apparel',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1579664227279-50a8f3ce0d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBqYWNrZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc2NTU0NzE0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    isNew: true,
  },
  {
    id: 4,
    name: 'Racing Chronograph',
    category: 'Watches',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1639564879163-a2a85682410e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB3YXRjaCUyMGx1eHVyeXxlbnwxfHx8fDE3NjU1NDcxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
  {
    id: 5,
    name: 'Collector Helmet Replica',
    category: 'Collectibles',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1761751237599-045ee9c853a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBoZWxtZXQlMjBjb2xsZWN0aWJsZXxlbnwxfHx8fDE3NjU1NDcxNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
  {
    id: 6,
    name: 'Team Backpack',
    category: 'Accessories',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1634843138984-360af3d8a02e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3NjU1NDcxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
  },
];

export function StoreSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-[var(--ferrari-gray)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className="tracking-widest mb-3"
            style={{ color: 'var(--ferrari-red)' }}
          >
            OFFICIAL STORE
          </div>
          <h2 className="text-white mb-4">Racing Collection</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover exclusive merchandise and collectibles from the legendary racing team
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-80 overflow-hidden bg-black/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <div
                      className="px-3 py-1 text-xs tracking-widest"
                      style={{ 
                        backgroundColor: 'var(--ferrari-red)',
                        color: 'white'
                      }}
                    >
                      NEW
                    </div>
                  )}
                </div>

                {/* Quick Add Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    className="px-6 py-3 text-white border border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    <span>QUICK ADD</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="text-white/50 text-sm mb-2">{product.category}</div>
                <h3 className="text-white mb-3">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-current"
                      style={{ color: 'var(--ferrari-red)' }}
                    />
                  ))}
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="text-white text-2xl">${product.price}</div>
                  <button
                    className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-[var(--ferrari-red)] hover:border-[var(--ferrari-red)] transition-all duration-300"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            className="px-12 py-4 text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--ferrari-red)' }}
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
