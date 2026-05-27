const marqueeItems = [
  "Software Development", "UI/UX Design", "Full Stack Web", "Graphics Design",
  "Creative Coding", "Web Applications", "Responsive Design", "Open Source",
];

const MarqueeSection = () => {
  return (
    <div className="py-8 border-y border-border overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="mx-6 text-sm font-mono text-muted-foreground flex items-center gap-4">
            {item}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeSection;
