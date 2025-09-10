import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { filterCities, validateCity, type City } from "@/lib/cities";

interface CityAutocompleteProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function CityAutocomplete({ value, onValueChange, placeholder = "Select a city...", className, id }: CityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredCities(filterCities(searchQuery));
  }, [searchQuery]);

  const handleSelect = (city: City) => {
    onValueChange(city.display);
    setOpen(false);
    setSearchQuery("");
  };

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
    // If user types something that's not a valid city, clear the value
    if (query && !validateCity(query)) {
      onValueChange(query); // Allow typing but don't validate yet
    }
  };

  const displayValue = value || "";
  const isValidCity = value ? validateCity(value) : false;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            !isValidCity && value && "border-red-300 text-red-600",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="truncate">
              {displayValue || placeholder}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder="Search cities..."
            value={searchQuery}
            onValueChange={handleInputChange}
          />
          <CommandList>
            <CommandEmpty>No cities found.</CommandEmpty>
            <CommandGroup>
              {filteredCities.map((city) => (
                <CommandItem
                  key={city.display}
                  value={city.display}
                  onSelect={() => handleSelect(city)}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="font-medium">{city.name}</span>
                    <span className="text-sm text-gray-500">{city.country}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === city.display ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}