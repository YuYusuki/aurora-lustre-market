import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/Carousel';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { useState } from 'react';
import { Product, useCart } from '@/context/CartContext';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import productsData from '@/data/products.json';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Featured products (primeiros 6 do JSON)
  const featuredProducts = productsData.slice(0, 6);

  // Carousel images (usando as imagens dos produtos)
  const carouselImages = [
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80',
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: 'Produtos Premium',
      description: 'Seleção exclusiva de itens de luxo',
    },
    {
      icon: Shield,
      title: 'Garantia Total',
      description: 'Certificado de autenticidade',
    },
    {
      icon: Truck,
      title: 'Entrega Rápida',
      description: 'Frete grátis em todo Brasil',
    },
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: 'Produto adicionado!',
      description: `${product.nome} foi adicionado ao carrinho.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Carousel images={carouselImages} />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 px-4 max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              NYNNA PRESENTES
            </h1>
            <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
              Elegância e sofisticação em cada detalhe
            </p>
            <Button
              asChild
              size="lg"
              className="bg-rose hover:opacity-90 transition-opacity text-white h-14 px-8 text-lg"
            >
              <Link to="/produtos">
                Explorar Coleção
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 border-y border-border bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl glass-effect hover-lift"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-luxury flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-gradient">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra nossa seleção exclusiva de produtos premium
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 px-8"
            >
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-luxury relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pronto para elevar seu estilo?
            </h2>
            <p className="text-xl text-white/90">
              Explore nossa coleção completa e encontre peças únicas que definem elegância
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-14 px-8 text-lg"
            >
              <Link to="/produtos">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Home;
