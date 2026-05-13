import { useEffect, useState } from "react";
import { useFileQuery } from "@/shared/hooks/useFileQuery";

interface Props {
  avatarId: string;
  className?: string;
}

export const Avatar = ({ avatarId, className }: Props) => {
  const { file } = useFileQuery(avatarId);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <img
      src={imageUrl ?? "/icons/user.svg"}
      alt="profile image"
      className={`size-full rounded-full object-cover ${className}`}
    />
  );
};
