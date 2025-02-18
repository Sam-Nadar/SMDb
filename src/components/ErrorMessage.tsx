interface ErrorProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorProps) {
    return <div className="text-red-500 text-center mt-10">{message}</div>;
  }
  