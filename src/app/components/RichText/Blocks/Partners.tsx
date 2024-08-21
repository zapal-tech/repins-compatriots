import Image from 'next/image';
import Link from 'next/link';

export const Partners: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-x-20 gap-y-10 xl:justify-between">
      <Link href="https://pfru.org.ua/">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/1.png'}
          alt={'partners'}
          width={190}
          height={56}
          unoptimized
          className="h-14"
        />
      </Link>

      <Link href="https://www.instagram.com/mc.campus.chuhuiv/">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/2.png'}
          alt={'partners'}
          width={140}
          height={56}
          unoptimized
          className="h-14"
        />
      </Link>

      <Link href="https://radio.nakypilo.ua/">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/3.png'}
          alt={'partners'}
          width={114}
          height={56}
          unoptimized
          className="h-14"
        />
      </Link>

      <Link href="https://repin.in.ua/">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/4.png'}
          alt={'partners'}
          width={130}
          height={56}
          unoptimized
          className="h-14"
        />
      </Link>

      <Link href="https://www.facebook.com/gomolodii.chuhuiv/?paipv=0&eav=Afby-D4zHBvyCI0XYmmpnEmYv5qTFnTD-ERvjAm3R_ivXqnJ0js-F7YW0BhotF3dGAg&_rdr">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/5.png'}
          alt={'partners'}
          width={56}
          height={56}
          unoptimized
          className="h-14"
        />
      </Link>

      <Link href="https://www.facebook.com/groups/784017685064332/?locale=uk_UA">
        <Image
          src={process.env.NEXT_PUBLIC_SITE_URL + '/partners/6.png'}
          alt={'partners'}
          width={154}
          height={56}
          unoptimized
          className="h-14"
        />
      </Link>
    </div>
  );
};
