"use client";

import { Fragment, useState, useEffect, useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  StarIcon as StarOutline,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Aside from "./Aside";

interface UserData {
  username: string;
  email: string;
  UserDepartmentName: string;
  OrgNameEn: string;
  OrgNameAr: string;
  ImageSrc: string;
  OrgLogo: string;
  userTypeName: string;
}

function loadUser(): UserData | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const FAVORITES_KEY = "pageFavorites";

interface FavoriteItem {
  MenuID: string | number;
  MenuName: string;
  NavigateUrl?: string | null;
}

function loadFavorites(): FavoriteItem[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(favs: FavoriteItem[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

function getInitial(name?: string): string {
  return name?.trim()?.charAt(0)?.toUpperCase() || "U";
}

export default function Navbar() {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const isRTL = i18n.dir() === "rtl";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const favRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(loadUser());
    setFavorites(loadFavorites());
  }, []);

  useEffect(() => {
    const sync = () => setFavorites(loadFavorites());
    window.addEventListener("favoritesChanged", sync);
    return () => window.removeEventListener("favoritesChanged", sync);
  }, []);

  useEffect(() => {
    if (favOpen) setFavorites(loadFavorites());
  }, [favOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (favRef.current && !favRef.current.contains(e.target as Node)) {
        setFavOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleUnpin = (e: React.MouseEvent, menuId: string | number) => {
    e.stopPropagation();
    const updated = favorites.filter((f) => f.MenuID !== menuId);
    saveFavorites(updated);
    setFavorites(updated);
    window.dispatchEvent(new Event("favoritesChanged"));
  };

  const handleFavClick = (item: FavoriteItem) => {
    setFavOpen(false);
    if (item.NavigateUrl) {
      window.location.href = item.NavigateUrl;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged"));
    router.push("/auth");
  };

  const hasAvatar = user?.ImageSrc && user.ImageSrc.trim() !== "";

  // Favorites dropdown: flip left/right for RTL
  const favDropdownSide = isRTL ? "left-0" : "right-0";

  // Profile dropdown: flip origin for RTL
  const menuItemsClass = isRTL
    ? "absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
    : "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none";

  return (
    <>
      <nav className="relative bg-Headerbg border-b border-[#00000010] z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-12 items-center justify-between font-tajawal">

            {/* Burger — always on the "start" side */}
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center dark:text-gray-300 rounded-md p-2 text-gray-600 hover:bg-black/5 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <span className="sr-only">{t("navbar.toggleSidebar")}</span>
                <Bars3Icon className="size-8" aria-hidden="true" />
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Org name — show AR when RTL */}
              <span className="text-sm text-gray-700 max-[400px]:hidden dark:text-gray-300">
                {isRTL ? user?.OrgNameAr || user?.OrgNameEn || "" : user?.OrgNameEn || ""}
              </span>

              {/* ★ Favorites */}
              <div className="relative" ref={favRef}>
                <button
                  type="button"
                  onClick={() => setFavOpen((prev) => !prev)}
                  className="relative rounded-full p-1.5 text-gray-600 hover:bg-black/5 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-colors dark:text-gray-300"
                >
                  <span className="sr-only">{t("navbar.favorites")}</span>
                  {favorites.length > 0 ? (
                    <StarSolid aria-hidden="true" className="size-5 text-amber-400" />
                  ) : (
                    <StarOutline aria-hidden="true" className="size-5" />
                  )}
                  {favorites.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-amber-400 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                      {favorites.length}
                    </span>
                  )}
                </button>

                {favOpen && (
                  <div className={`absolute ${favDropdownSide} top-[calc(100%+6px)] bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 w-[calc(100vw-24px)] max-w-[288px] sm:w-72`}>
                    <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-1.5">
                        <StarSolid className="size-3.5 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                          {t("navbar.favorites")}
                        </span>
                      </div>
                      {favorites.length > 0 && (
                        <span className="text-[10px] text-gray-400">
                          {t("navbar.pages", { count: favorites.length })}
                        </span>
                      )}
                    </div>
                    <div className="max-h-60 sm:max-h-72 overflow-y-auto py-1">
                      {favorites.length === 0 ? (
                        <div className="px-4 py-6 sm:py-8 text-center">
                          <StarOutline className="size-7 text-gray-200 mx-auto mb-2" />
                          <p className="text-xs font-semibold text-gray-400">
                            {t("navbar.noFavoritesYet")}
                          </p>
                          <p className="text-[10px] text-gray-300 mt-1">
                            {t("navbar.pinHint")}
                          </p>
                        </div>
                      ) : (
                        favorites.map((item) => (
                          <div
                            key={item.MenuID}
                            onClick={() => handleFavClick(item)}
                            className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                              <StarSolid className="size-3.5 text-white" />
                            </div>
                            <span className="flex-1 text-xs font-medium text-gray-700 dark:text-gray-200 truncate">
                              {item.MenuName}
                            </span>
                            <button
                              onClick={(e) => handleUnpin(e, item.MenuID)}
                              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 transition-all"
                              title={t("navbar.removeFromFavorites")}
                            >
                              <XMarkIcon className="size-3 text-red-400" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar / Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <span className="sr-only">{t("navbar.openUserMenu")}</span>
                  {hasAvatar ? (
                    <img
                      alt={user?.username || ""}
                      src={user!.ImageSrc}
                      className="size-8 rounded-full bg-gray-200 ring-1 ring-black/10 object-cover"
                    />
                  ) : (
                    <div className="size-8 rounded-full bg-gradient-to-br from-[#2579A7] to-indigo-600 ring-1 ring-black/10 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {getInitial(user?.username)}
                      </span>
                    </div>
                  )}
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className={menuItemsClass}>
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                        {user?.username || "User"}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {user?.email || ""}
                      </p>
                      {user?.OrgNameEn && (
                        <p className="text-[10px] text-indigo-500 font-medium mt-1 truncate">
                          {isRTL ? user.OrgNameAr || user.OrgNameEn : user.OrgNameEn}
                        </p>
                      )}
                    </div>

                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="/profile"
                          className={classNames(
                            focus ? "bg-gray-100 dark:bg-gray-700" : "",
                            "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                          )}
                        >
                          <UserCircleIcon className="size-4 text-gray-500" aria-hidden="true" />
                          {t("navbar.yourProfile")}
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          href="#"
                          className={classNames(
                            focus ? "bg-gray-100 dark:bg-gray-700" : "",
                            "flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                          )}
                        >
                          <Cog6ToothIcon className="size-4 text-gray-500" aria-hidden="true" />
                          {t("navbar.settings")}
                        </Link>
                      )}
                    </MenuItem>
                    <div className="border-t border-gray-100 dark:border-gray-700" />
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={handleSignOut}
                          className={classNames(
                            focus ? "bg-red-50 dark:bg-red-500/10" : "",
                            "flex items-center gap-2 px-4 py-2 text-sm text-red-600 w-full"
                          )}
                        >
                          <ArrowRightStartOnRectangleIcon className="size-4 text-red-500" aria-hidden="true" />
                          {t("navbar.signOut")}
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Aside isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}