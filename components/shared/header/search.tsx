import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name="q"
          type="text"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[100px]"
          variant="search"
        />
      </div>
    </form>
  );
};

export default Search;
