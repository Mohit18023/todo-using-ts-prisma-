interface SubHeadingProps {
    heading: string;  
}
export default function SubHeading({heading}: SubHeadingProps) {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      {heading}
    </h1>
  );
}
