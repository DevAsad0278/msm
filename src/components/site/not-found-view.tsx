import { PillLink } from "./pill-button";
import { SplitReveal, Reveal } from "./motion";

export function NotFoundView() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-28">
      <div className="container-x text-center">
        <p className="eyebrow text-electric">Error 404</p>
        <h1 className="display-xl mt-4 text-gradient-brand">
          <SplitReveal lines={["404"]} immediate />
        </h1>
        <Reveal delay={0.2}>
          <h2 className="display-md mt-6">This page took a different direction.</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or has moved. Let's get you back to something meaningful.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PillLink to="/" size="lg">Back to home</PillLink>
            <PillLink to="/contact" variant="outline" size="lg">Contact us</PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
