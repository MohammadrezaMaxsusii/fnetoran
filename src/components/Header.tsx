interface Props {
    title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <header className="flex items-center justify-between">
        <h1>{title}</h1>
    </header>
  );
};
