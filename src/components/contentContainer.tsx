import { BASE_URL } from '../globlas';

interface ContentContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function ContentContainer({
  children,
  title,
}: ContentContainerProps) {
  return (
    <div className="flex-8 px-10 py-5 min-w-0">
      <div className="flex flex-row space-x-6 border-b-2 pb-10 h-50">
        <div className="w-1/2  bg-tea bg-[url(/images/P1080694_more_expanded.JPG)] bg-cover bg-no-repeat content-center text-3xl font-medium text-white ">
          {/* <div className="w-full h-45 bg-tea bg-[url(/images/P1080694.JPG),_url(/images/P1030776.JPG),_url(/images/P1030760.JPG)] [background-size:33%,33%,33%] bg-no-repeat [background-position:left,center,right]  content-center text-3xl font-medium text-white "></div> */}
          <p className="pl-10">{title}</p>
        </div>

        <img
          src={BASE_URL + '/images/P1030776.JPG'}
          className="w-1/4 object-cover"
          alt=""
        />
        <img
          onClick={() => console.log(BASE_URL)}
          src={BASE_URL + '/images/P1030760.jpg'}
          className="w-1/4 object-cover"
          alt=""
        />
      </div>
      <section className="p-10">{children}</section>
    </div>
  );
}
