import { Hero } from '../components/home/hero';
import { StatsStrip } from '../components/home/stats-strip';
import { Mission } from '../components/home/mission';
import { Stories } from '../components/home/stories';
import { Benefits } from '../components/home/benefits';
import { Testimonials } from '../components/home/testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Mission />
      <Stories />
      <Benefits />
      <Testimonials />
    </>
  );
}
