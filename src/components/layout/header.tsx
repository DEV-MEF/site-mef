"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useServicos } from "@/components/contexts/servicos";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";

type MenuItem = {
  label: string;
  href?: string;
  command?: () => void;
  items?: SubMenuItem[];
};

type SubMenuItem = {
  label: string;
  href?: string;
  command?: () => void;
};

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { direcoes, setSelectedDirecao } = useServicos();
  const [state, setState] = useState(false);

  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if subitem is active
  const isSubItemActive = (subItem: SubMenuItem) => {
    if (subItem.href) return pathname.startsWith(subItem.href);
    return false;
  };

  // Check if item or any subitem is active
  const isActive = (href?: string, items?: SubMenuItem[]) => {
    if (href && pathname === href) return true;
    if (items) {
      return items.some((subItem) => {
        if (subItem.href) return pathname.startsWith(subItem.href);
        return false;
      });
    }
    return false;
  };

  // Create services menu items
  const servicesMenuItems: SubMenuItem[] = direcoes.map((dir) => ({
    label: (dir.name || "").toUpperCase(),
    command: () => {
      setSelectedDirecao(dir);
      router.push(`/instituicoes#${(dir.acronym || "").toLowerCase()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  }));

  // Main menu items
  const menuItems: MenuItem[] = [
    {
      label: "INÍCIO",
      href: "/",
    },
    {
      label: "MINISTÉRIO",
      // href: "/ministerio",
      items: [
        {
          label: "SOBRE NÓS",
          href: "/ministerio/sobre-nos",
        },
        {
          label: "O QUE FAZEMOS",
          href: "/ministerio/o-que-fazemos",
        },
        {
          label: "NOSSA EQUIPA",
          href: "/ministerio/nossa-equipa",
        },
        {
          label: "A MENSAGEM DO MINISTRO",
          href: "/ministerio/o-ministro",
        },
      ],
    },
    {
      label: "INSTITUIÇÕES",
      // href: "/servicos",
      items:
        direcoes.length > 0
          ? servicesMenuItems
          : [{ label: "Carregando...", command: () => {} }],
    },
    {
      label: "PUBLICAÇÕES",
      // href: "/publicacoes",
      items: [
        { label: "NOTÍCIAS", href: "/publicacoes/noticias" },
        { label: "iMAGENS", href: "/publicacoes/imagens" },
        { label: "VÍDEOS", href: "/publicacoes/videos" },
        { label: "DOCUMENTOS", href: "/publicacoes/documentos" },
        { label: "LEGISLAÇÕES", href: "/publicacoes/legislacoes" },
      ],
    },
    {
      label: "CONTACTE-NOS",
      href: "/contactos",
    },
  ];

  return (
    <header
      className={cn(
        "w-full fixed z-50 bg-white transition-all duration-300",
        isScrolled ? "shadow-lg" : "shadow-sm"
      )}
    >
      {/* Top ribbon */}
      {/*<div className="relative hidden h-[30px] items-center justify-end pr-4 text-sm text-white md:flex">
        <div className="clip-diagonal absolute inset-0 z-10 bg-primary-blue" />
        <div className="absolute inset-y-0 right-0 w-full bg-gray-800" />
        <span className="relative z-10 block text-[11px] md:block">
          {ministerio.name} da República Democrática de São Tomé e Príncipe
        </span>
      </div>*/}

      {/* Main header */}
      <div className="w-full container max-w-[88rem]  mx-auto flex h-24 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="transition-transform hover:scale-105">
          <Image
            src="/images/logo.new.png"
            alt="Logo"
            width={1000}
            height={100}
            unoptimized
            className="object-contain w-52 sm:w-64 lg:w-80 h-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-1">
            {menuItems.map((item) => (
              <li key={item.label} className="relative group">
                {item.items ? (
                  <>
                    <Button
                      variant="ghost"
                      className={cn(
                        "uppercase text-sm px-3 py-5 rounded-none relative",
                        "hover:bg-primary-blue/10 hover:text-primary-blue cursor-pointer transition-all ease-in-out duration-50",
                        isActive(item.href, item.items)
                          ? "text-primary-blue font-semibold"
                          : "text-text-primary font-medium"
                      )}
                      onClick={() => item.href && router.push(item.href)}
                    >
                      {item.label}
                    </Button>
                    <div className="absolute left-0 top-full z-50 hidden min-w-[220px] rounded-md border border-gray-100 bg-white p-1 shadow-lg group-hover:block animate-in fade-in slide-in-from-top-2 space-y-1">
                      {item.items.map((subItem, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start font-normal uppercase",
                            "hover:bg-primary-blue/10 hover:text-primary-blue",
                            "transition-all duration-150 hover:pl-7 cursor-pointer ",
                            isSubItemActive(subItem)
                              ? "text-primary-blue bg-primary-blue/5 font-semibold"
                              : "text-text-primary font-medium"
                          )}
                          onClick={
                            subItem.command ||
                            (() => subItem.href && router.push(subItem.href))
                          }
                        >
                          {subItem.label}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className={cn(
                      "uppercase font-medium text-sm px-3 py-5 rounded-none relative",
                      "hover:bg-primary-blue/10 hover:text-primary-blue cursor-pointer rounded",
                      "transition-colors duration-200",
                      isActive(item.href)
                        ? "text-primary-blue font-semibold"
                        : "text-text-primary"
                    )}
                    onClick={
                      item.command ||
                      (() => item.href && router.push(item.href))
                    }
                  >
                    {item.label}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation - Improved for smaller screens */}
        <div className="lg:hidden">
          <Sheet
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              setState(open);
            }}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white outline-none p-2 rounded-md bg-primary-blue hover:bg-primary-blue border-2 cursor-pointer w-10 h-10"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full bg-white">
              <div className="flex h-full flex-col">
                <div className="mb-4 border-b flex items-center justify-between py-2 px-4 border-zinc-500/10">
                  <Link
                    href="/"
                    onClick={() => {
                      setIsOpen(false);
                      setState(false);
                    }}
                  >
                    <Image
                      src="/images/logo.new.png"
                      alt="Logo"
                      width={1000}
                      height={1000}
                      unoptimized
                      className="object-contain w-44 h-auto sm:w-52 mb-1"
                    />
                  </Link>
                </div>
                <div className="w-full flex-1 overflow-y-auto">
                  <ul className="space-y-2">
                    {menuItems.map((item) => (
                      <li key={item.label}>
                        {item.items ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-between text-md uppercase px-4 py-3",
                                  "hover:bg-primary-blue/10 hover:text-primary-blue",
                                  isActive(item.href, item.items) &&
                                    "text-primary-blue bg-primary-blue/5"
                                )}
                                onClick={() => {
                                  setState(false);
                                }}
                              >
                                <span>{item.label}</span>
                                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              sideOffset={8}
                              className="bg-primary-blue pr-10 sm:pr-20 border-none shadow-none ml-3"
                            >
                              {item.items.map((subItem, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    "text-md px-4 py-3 text-white",
                                    "hover:bg-primary-blue/10 hover:text-white/90",
                                    isSubItemActive(subItem) && "underline"
                                  )}
                                  onClick={() => {
                                    if (subItem.command) {
                                      subItem.command();
                                    } else if (subItem.href) {
                                      router.push(subItem.href);
                                    }
                                    setIsOpen(false);
                                    setState(false);
                                  }}
                                >
                                  <div className="flex items-center">
                                    {subItem.label}
                                    {isSubItemActive(subItem) && (
                                      <ChevronRight className="ml-2 h-4 w-4" />
                                    )}
                                  </div>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start text-md uppercase px-4 py-3 -ml-1",
                              "hover:bg-primary-blue/10 hover:text-primary-blue",
                              isActive(item.href) &&
                                "text-primary-blue bg-primary-blue/5"
                            )}
                            onClick={() => {
                              if (item.command) {
                                item.command();
                              } else if (item.href) {
                                router.push(item.href);
                              }
                              setIsOpen(false);
                              setState(false);
                            }}
                          >
                            {item.label}
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
