"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { fetchSearchResults } from "@/lib/utils";
import SearchResultProps from "@/components/SearchResults";

interface SearchResultsType {
  albums: any[];
  tracks: any[];
}
interface SearchBarProps {
  onSearch: (query: string) => void | Promise<void>; // Allow either a void return or a Promise<void>
  Rounded?: string;
  Height?: string;
}
const SearchBar = ({ onSearch, Rounded, Height }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass the query back to the parent component
  };
  return (
    <>
      <div
        className={`flex w-full h-${
          Height ? Height : "14"
        } bg-gradient-to-bl from-glass1 to-glass2 p-4 sub-header items-center shadow-lg rounded-${
          Rounded ? Rounded : "md"
        }`}
      >
        <FiSearch className="text-white" />
        <Input
          placeholder="Search..."
          className="shad-input bg-transparent placeholder:text-white border-0"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </>
  );
};
export default SearchBar;
