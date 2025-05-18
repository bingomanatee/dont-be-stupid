import { Avatar } from '@chakra-ui/react';

export function CatAvatar({ cat }) {
  if (!cat?.imageUrl) {
    return 'no image';
  }
  return (
    <Avatar.Root size="xl">
      <Avatar.Fallback name={cat.name ?? '??'} />
      <Avatar.Image src={cat.imageUrl} />
    </Avatar.Root>
  );
}