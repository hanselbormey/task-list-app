import { Hash, Link, Mail } from 'react-feather';

import { Tag } from '@/types/enums';

const IconTag: React.FC<{ tag: Tag; label: string }> = ({ tag, label }) => {
  switch (tag) {
    case Tag.EMAIL:
      return (
        <a className="flex items-center" href={`mailto:${label}`}>
          <Mail className="w-4 h-4" />
          <p className="mx-1">Mail</p>
        </a>
      );
    case Tag.LINK:
      return (
        <a
          className="flex items-center hover:cursor-pointer"
          rel="external"
          href={!label.includes('http') ? `https://${label}` : label}
          target="_blank"
        >
          <Link className="w-4 h-4" />
          <p className="mx-1">Link</p>
        </a>
      );
    case Tag.HASHTAG:
      return (
        <a className="flex items-center">
          <Hash className="w-4 h-4" />
          <p className="mx-1">{label.slice(1)}</p>
        </a>
      );
    case Tag.MENTION:
      return (
        <a className="flex items-center">
          <img
            className="object-cover w-5 h-5 rounded-xl"
            src="/woman_avatar.jpg"
          />
          <p className="mx-1">{label.slice(1)}</p>
        </a>
      );
  }
};

export default IconTag;
