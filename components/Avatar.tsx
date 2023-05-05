import cn from 'classnames';

export default function Avatar({
  src,
  classname,
}: {
  src: string;
  classname: string;
}) {
  return <img src={src} className={cn('w-4 h-4 rounded-lg', classname)} />;
}
