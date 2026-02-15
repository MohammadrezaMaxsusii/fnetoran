import { useEffect, useState } from "react";
import { useFileQuery } from "@/shared/hooks/useFileQuery";

interface Props {
  profileId: string;
  className?: string;
}

export const UserAvatar = ({ profileId, className }: Props) => {
  const { file } = useFileQuery(profileId);
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
