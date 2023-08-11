import { Link } from "react-router-dom";
import { UserType } from "../../lib/utils";
import useUserStore from "../../stores/userStore";

const Home = () => {
  const { isLoggedIn, role } = useUserStore();
  return (
    <div className="h-screen bg-white">
      <main>
        <div className="relative isolate h-screen overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&w=1000&q=80"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />

          <div className="h-full bg-black/60">
            <div className="mx-auto max-w-lg py-32 sm:py-48 md:max-w-2xl lg:py-32">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                  Experience Luxury and Comfort Beyond Compare
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {!isLoggedIn && (
                    <Link
                      to="/login"
                      className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                      Get started!
                    </Link>
                  )}
                  {role === UserType.Customer && (
                    <Link
                      to="/contact"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                    >
                      Contact us
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
