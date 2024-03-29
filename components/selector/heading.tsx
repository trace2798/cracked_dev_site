interface HeadingProps {
    title: string;
    description: string;
  }
  
  export const Heading = ({ title, description }: HeadingProps) => {
    return (
      <>
        <div className="flex mb-8 text-left  gap-x-3 mt-5">
          <div>
            <h2 className="text-3xl font-bold text-primary">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </>
    );
  };