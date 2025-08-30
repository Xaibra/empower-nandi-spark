import TujitumeLogo from "@/assets/tujitume-logo.svg";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const LoadingSpinner = ({ size = "md", text = "Loading..." }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <img 
          src={TujitumeLogo} 
          alt="Loading..." 
          className={`${sizeClasses[size]} animate-pulse-slow`}
        />
        {/* Rotating ring around logo */}
        <div className="absolute inset-0 border-2 border-transparent border-t-secondary rounded-full animate-spin"></div>
      </div>
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
