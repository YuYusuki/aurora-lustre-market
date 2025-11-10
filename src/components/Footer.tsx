import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-luxury flex items-center justify-center">
                <span className="text-xl font-bold text-white">LS</span>
              </div>
              <span className="text-lg font-bold text-gradient">Luxury Shop</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sua boutique de produtos premium e exclusivos. 
              Qualidade incomparável e atendimento personalizado.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span>contato@luxuryshop.com</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-primary transition-colors">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Redes Sociais</h3>
            <p className="text-sm text-muted-foreground">
              Siga-nos para novidades e ofertas exclusivas
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-gradient-luxury flex items-center justify-center transition-all hover-lift group"
                >
                  <social.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Luxury Shop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
