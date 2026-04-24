import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/components/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { countries } from "./countries"

export type Country = (typeof countries)[number]

interface CountryInputProps extends React.ComponentPropsWithoutRef<"input"> {
  value?: string
  defaultCountry?: string
}

export const CountryInput = React.forwardRef<
  HTMLInputElement,
  CountryInputProps
>(
  (
    {
      value: valueProp,
      defaultCountry = "United States",
      className,
      id,
      required = true,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [openCommand, setOpenCommand] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(defaultCountry)

    const isControlled = valueProp !== undefined
    const value = isControlled ? valueProp : internalValue

    const selectedCountry = countries.find((country) => country.name === value)

    const handleCountrySelect = (countryName: string) => {
      if (!isControlled) {
        setInternalValue(countryName)
      }
      onChange?.(countryName as never)
      onBlur?.({} as React.FocusEvent<HTMLInputElement>)
      setOpenCommand(false)
    }

    return (
      <div className={cn("flex gap-2", className)}>
        <Popover open={openCommand} onOpenChange={setOpenCommand} modal={true}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={openCommand}
              className="w-max items-center justify-between whitespace-nowrap text-sm"
            >
              {selectedCountry?.name ? (
                <>
                  <span>{selectedCountry.emoji}</span>
                  <span>{selectedCountry.name}</span>
                </>
              ) : (
                "Choose country"
              )}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-max" align="start">
            <Command>
              <CommandInput placeholder="Find a country..." />
              <CommandList>
                <CommandEmpty>Country is not found.</CommandEmpty>
                <ScrollArea
                  className={
                    "[&>[data-radix-scroll-area-viewport]]:max-h-[300px]"
                  }
                >
                  <CommandGroup heading="Countries">
                    {countries.map((country) => (
                      <CommandItem
                        key={country.iso3}
                        value={country.name}
                        onSelect={() => handleCountrySelect(country.name)}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            value === country.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <img
                          src={`/flags/${country.iso2.toLowerCase()}.svg`}
                          className="relative top-0.5 mr-2 w-4 h-3 object-cover"
                          alt={country.name}
                        />
                        <span>{country.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <input
          ref={ref}
          type="text"
          id={id}
          hidden
          value={value}
          required={required}
          aria-required={required}
          onChange={(event) => onChange?.(event)}
          onBlur={onBlur}
          {...rest}
        />
      </div>
    )
  }
)

CountryInput.displayName = "CountryInput"
