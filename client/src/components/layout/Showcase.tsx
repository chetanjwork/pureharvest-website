import Image from 'next/image';
import Container from '../ui/Container';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import MotionWrapper from '../motion/MotionWrapper';
import ScrollTextReveal from '../motion/ScrollTextReveal';

const showcaseItems = [
  {
    src: '/signature-a-front.webp',
    label: 'Luxury Hotels',
    tag: 'Hospitality',
  },
  {
    src: '/classic-front.webp',
    label: 'Premium Cafés',
    tag: 'F&B',
  },
  {
    src: '/signature-b-front.webp',
    label: 'Wedding & Events',
    tag: 'Celebrations',
  },
];

export default function Showcase() {
  return (
    <Section className="bg-brand-primary text-brand-accent" id="showcase">
      <Container>
        <div className="text-center mb-20">
          <MotionWrapper>
            <span className="text-brand-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Our Work
            </span>
          </MotionWrapper>
          <div className="flex justify-center">
            <ScrollTextReveal 
              text="Every Bottle Tells Your Brand Story" 
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-brand-accent text-center leading-tight max-w-5xl uppercase tracking-tight"
            />
          </div>
          <div className="flex justify-center mt-8">
            <ScrollTextReveal 
              text="From luxury hotel suites to intimate weddings — we craft experiences that your guests remember long after the last drop." 
              className="text-brand-accent/60 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed text-center"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {showcaseItems.map((item, i) => (
            <MotionWrapper key={i} delay={i * 0.15} className="group relative rounded-[40px] overflow-hidden aspect-[3/4] card-lift bg-white shadow-xl border border-black/[0.05]">
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              {/* Bottom Label */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-bold md:drop-shadow-md">{item.tag}</span>
                <h3 className="text-2xl font-heading font-semibold text-white mt-1 md:drop-shadow-lg tracking-tight">{item.label}</h3>
              </div>
              
              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 md:bg-black/20 md:backdrop-blur-[2px]">
                <a
                  href={`https://wa.me/918149174975?text=Hello%20PureHarvest%2C%20I%20am%20interested%20in%20bottles%20for%20${encodeURIComponent(item.label)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-brand-accent px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform duration-300"
                >
                  Get This Look
                </a>
              </div>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper delay={0.5} className="mt-16 text-center">
          <a
            href="https://wa.me/918149174975?text=Hello%20PureHarvest%2C%20I%20would%20like%20to%20request%20custom%20bottle%20samples."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-brand-accent/20 text-brand-accent px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all duration-300"
          >
            Request Samples
          </a>
        </MotionWrapper>
      </Container>
    </Section>
  );
}
