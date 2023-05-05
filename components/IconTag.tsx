import { Hash, Link, Mail } from 'react-feather';

import { Tag } from '@/types/enums';
import { IMG_SRC } from '@/utils/constants';
import Avatar from './Avatar';

const IconTag: React.FC<{ tag: Tag; label: string }> = ({ tag, label }) => {
  switch (tag) {
    case Tag.EMAIL:
      return (
        <a className="flex items-center" href={`mailto:${label}`}>
          <Mail className="w-4 h-4 mr-1" />
          Mail
        </a>
      );
    case Tag.LINK:
      return (
        <a
          className="flex items-center"
          rel="external"
          href={!label.includes('http') ? `https://${label}` : label}
        >
          <Link className="w-4 h-4 mr-1" />
          Link
        </a>
      );
    case Tag.HASHTAG:
      return (
        <a className="flex items-center">
          <Hash className="w-4 h-4 mr-1" />
          {label.slice(1)}
        </a>
      );
    case Tag.MENTION:
      return (
        <a className="flex items-center">
          <Avatar classname="mr-1" src={IMG_SRC} />
          {label.slice(1)}
        </a>
      );
  }
};

export default IconTag;
