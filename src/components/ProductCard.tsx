import { Product } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onClick, onAddToCart }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden border-border/50 hover-lift cursor-pointer bg-card">
      <div className="relative aspect-square overflow-hidden" onClick={onClick}>
        <img
          src={product.imagem}
          alt={product.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-medium bg-gradient-luxury text-white rounded-full shadow-soft">
            {product.categoria}
          </span>
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <div onClick={onClick}>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.nome}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.descricao}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.valor)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-gradient-luxury hover:opacity-90 transition-opacity"
            aria-label={`Adicionar ${product.nome} ao carrinho`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
};
