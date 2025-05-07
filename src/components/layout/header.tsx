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
import { MenuIcon, ChevronRight } from "lucide-react";

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
          label: "Sobre Nós",
          href: "/ministerio/sobre-nos",
        },
        {
          label: "O que fazemos",
          href: "/ministerio/o-que-fazemos",
        },
        {
          label: "Nossa Equipa",
          href: "/ministerio/nossa-equipa",
        },
        {
          label: "Mensagem do Ministro",
          href: "/ministerio/o-ministro",
        },
      ],
    },
    {
      label: "Instituições",
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
        { label: "Notícias", href: "/noticias" },
        { label: "Imagens", href: "/imagens" },
        { label: "Vídeos", href: "/videos" },
        { label: "Documentos", href: "/documentos" },
        { label: "Legislação", href: "/legislacao" },
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
        "fixed z-50 w-full bg-white transition-all duration-300",
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
      <div className="w-full container mx-auto flex h-24 items-center justify-between px-4">
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
        <nav className="w-full hidden lg:block">
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
                    <div className="absolute left-0 top-full z-50 hidden min-w-[220px] rounded-md border border-gray-100 bg-white p-1 shadow-lg group-hover:block animate-in fade-in slide-in-from-top-2">
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
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-primary-blue hover:text-white hover:bg-primary-blue/90 cursor-pointer w-10 h-10"
              >
                <MenuIcon className="h-8 w-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-10/12 max-w-xs bg-white">
              <div className="flex h-full flex-col">
                <div className="mb-4 border-b flex items-center justify-between py-2 px-4 border-zinc-500/10">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/images/logo.new.png"
                      alt="Logo"
                      width={1000}
                      height={1000}
                      unoptimized
                      className="object-contain w-40 h-auto sm:w-52"
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
                                  "w-full justify-between text-lg uppercase px-4 py-3",
                                  "hover:bg-primary-blue/10 hover:text-primary-blue",
                                  isActive(item.href, item.items) &&
                                    "text-primary-blue bg-primary-blue/5"
                                )}
                              >
                                <span>{item.label}</span>
                                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              sideOffset={8}
                              className="w-[calc(100vw-120px)] border-none shadow-none"
                            >
                              {item.items.map((subItem, index) => (
                                <DropdownMenuItem
                                  key={index}
                                  className={cn(
                                    "text-md px-4 py-3",
                                    "hover:bg-primary-blue/10 hover:text-primary-blue",
                                    isSubItemActive(subItem) &&
                                      "text-primary-blue bg-primary-blue/5"
                                  )}
                                  onClick={() => {
                                    if (subItem.command) {
                                      subItem.command();
                                    } else if (subItem.href) {
                                      router.push(subItem.href);
                                    }
                                    setIsOpen(false);
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
                              "w-full justify-start text-lg uppercase px-4 py-3",
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
                            }}
                          >
                            {item.label}
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                {/*
                <div className="mt-auto border-t pt-4">
                  <div className="px-4 text-sm text-gray-500">
                    {ministerio.name} © {new Date().getFullYear()}
                  </div>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
