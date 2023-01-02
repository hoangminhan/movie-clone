import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Empty, Skeleton, Tooltip } from "antd";
import iconImg from "assets";
import { ImageCustom, SkeletonCustom } from "components";
import { UserContext } from "contexts";
import { useTitle } from "hooks";
import { useHomePage } from "hooks/use-homepage";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { formatNumber, getImage } from "utils";

const GenresPage = () => {
  const { id } = useParams();
  const [idGenres, setIdGenres] = useState(() => {
    return id.split("-")[0];
  });
  const nameGenre = id.split("-")[1];
  const stateContext = useContext(UserContext);
  const locale = sessionStorage.getItem("currentLocale");
  const [searchParams, setSearchParams] = useSearchParams({});
  const [filters, setFilters] = useState({
    page: searchParams.get("page") || 1,
    language: searchParams.get("language") || locale,
  });
  const {
    handleGetListMovieOfGenres,
    listMovieOfGenres,
    isLoading,
  } = useHomePage();
  const { item_count, items: dataGenres } = listMovieOfGenres;
  const [quanlityItem, setQuanlityItem] = useState(20);
  const [isClick, setIsClick] = useState(false);
  const isShowMore = quanlityItem < item_count ? true : false;
  const navigate = useNavigate();

  const executeScroll = () => {
    const elementToScroll = document.getElementById("button-show");

    elementToScroll.scrollIntoView({
      behavior: "smooth",
    });
  };
  const { handleChangeTitle } = useTitle();

  const handleClickShow = () => {
    setQuanlityItem((preState) =>
      preState < item_count ? preState + 20 : preState - 20
    );
    setIsClick(true);
  };
  useEffect(() => {
    handleChangeTitle(nameGenre);
  }, []);

  useEffect(() => {
    if (isClick) {
      setTimeout(() => {
        executeScroll();
      }, 200);
    }
  }, [quanlityItem]);

  //   sync filter with url
  useLayoutEffect(() => {
    setSearchParams({
      ...filters,
    });
  }, [filters, stateContext]);
  //   get data

  useLayoutEffect(() => {
    const getData = async () => {
      handleGetListMovieOfGenres(idGenres, {
        ...filters,
        api_key: process.env.REACT_APP_API_KEY,
      });
    };
    getData();
  }, [stateContext, filters]);
  return (
    <>
      <div className="my-5 flex justify-between items-center">
        <p>{nameGenre}</p>
        <p>{item_count}</p>
      </div>

      <div
        className={`min-h-[100vh] ${
          dataGenres?.length ? "my-[32px]" : "flex justify-center items-center"
        }`}
      >
        {isLoading ? (
          <SkeletonCustom quantity={15} />
        ) : (
          <div className="flex flex-wrap gap-6 justify-evenly sm:justify-start">
            {dataGenres?.map((item, index) => {
              return (
                index < quanlityItem && (
                  // <Link key={index} to={`/movie/${item.id}`}>
                  <div
                    key={index}
                    className="max-w-[185px] hover:scale-110 duration-200 cursor-pointer relative"
                    onClick={() => {
                      const type =
                        item?.media_type === "movie" ? "movie" : "tv";
                      sessionStorage.setItem(
                        "currentTab",
                        item.media_type === "movie" ? "/" : "/tv-show"
                      );

                      navigate(`/${type}/${item.id}`);
                    }}
                  >
                    <img
                      alt=""
                      src={
                        getImage(item.poster_path, "w185").includes("null")
                          ? iconImg.Img404
                          : getImage(item.poster_path, "w185")
                      }
                      className="rounded-md"
                    />
                    <Tooltip title={item?.title}>
                      <p className="text-[16px] line-clamp-1 text-center">
                        {item?.title}
                      </p>
                    </Tooltip>
                    <div className="absolute top-[-8px] right-[0px] text-[13px]">
                      <Badge.Ribbon
                        color="#158370"
                        text={
                          <p className="rounded-[10px]  m-0 leading-6">
                            {formatNumber(item.vote_average, 10)}
                            <span className="inline-block ml-1">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-white"
                              />
                            </span>
                          </p>
                        }
                      ></Badge.Ribbon>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        )}

        {/* show more button */}
        {item_count > 20 && (
          <div className="text-center mt-[80px]">
            <button
              id="button-show"
              className="bg-primarybg text-white min-w-[160px] py-1 rounded-md cursor-pointer text-[18px] transition-all hover:scale-105 ease-linear"
              onClick={handleClickShow}
            >
              {isShowMore ? "Show more" : "Show less"}
            </button>
          </div>
        )}
        {!dataGenres?.length && !isLoading && (
          <div className="h-[100%]">
            <Empty />
          </div>
        )}
      </div>
    </>
  );
};

export default GenresPage;
