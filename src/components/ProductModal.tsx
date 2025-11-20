import { useState } from 'react';
import { Product, useCart } from '@/context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();
  const { toast } = useToast();

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Produto adicionado!',
      description: `${quantity}x ${product.nome} foi adicionado ao carrinho.`,
    });
    setQuantity(1);
    onClose();
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      addToCart(product, quantity);
    } else {
      addToCart(product, quantity);
    }
    
    // Prepara mensagem do WhatsApp
    const cartItems = cart.length === 0 
      ? [{ ...product, quantity }] 
      : [...cart, { ...product, quantity }];
    
    let valorTotal = 0;
    let lista = '';
    
    cartItems.forEach(item => {
      const valorMultiply = item.valor * item.quantity;
      lista += `*${item.nome}*
*Quantidade:* ${item.quantity}
*Valor:* ${formatPrice(valorMultiply)}

`;
      valorTotal += valorMultiply;
    });
    
    const mensagem = `*Esse é o meu pedido!*
${lista}*Total: ${formatPrice(valorTotal)}*`;
    
    // Envia para WhatsApp
    const phone = "5516996004681";
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const encodedText = encodeURIComponent(mensagem);
    const isMobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const whatsappLink = isMobile 
      ? `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`
      : `https://wa.me/${cleanPhone}?text=${encodedText}`;
    
    window.open(whatsappLink, '_blank');
    
    setQuantity(1);
    onClose();
    
    toast({
      title: 'Pedido enviado!',
      description: 'Seu pedido foi enviado via WhatsApp.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            {product.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden shadow-luxury">
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-gradient-luxury text-white rounded-full shadow-soft">
                {product.categoria}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.descricao}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-baseline space-x-2">
                <span className="text-sm text-muted-foreground">Preço:</span>
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.valor)}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Quantidade
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-gradient-luxury hover:opacity-90 transition-opacity text-white h-12"
                onClick={handleBuyNow}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Comprar Agora
              </Button>
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Total */}
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.valor * quantity)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
