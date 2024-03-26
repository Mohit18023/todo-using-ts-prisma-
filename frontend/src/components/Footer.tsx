interface FooterProps {
    // Add a type for the props
    text: string
    link: string
    to: string
}
export default function Footer({text, link, to}: FooterProps) {
  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      {text}{" "}
      <a
        href={link}
        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        {to}
      </a>
    </p>
  );
}
