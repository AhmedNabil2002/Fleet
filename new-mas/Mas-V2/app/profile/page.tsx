"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  UserCircleIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  ClockIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

interface UserData {
  username: string;
  email: string;
  lastActive: string;
  UserTypeID: number;
  userTypeName: string;
  UserDepartmentID: number;
  UserDepartmentName: string;
  UserOrgID: number;
  ImageSrc: string;
  OrgLogo: string;
  OrgNameAr: string;
  OrgNameEn: string;
  VehicleID: string | null;
}

function getInitial(name?: string): string {
  return name?.trim()?.charAt(0)?.toUpperCase() || "U";
}

function formatDate(dateString?: string, lang = "en"): string {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleString(lang === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateString;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        router.push("/auth");
        return;
      }
      setUser(JSON.parse(raw));
    } catch {
      router.push("/auth");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center font-tajawal text-gray-400 dark:text-gray-500"
        style={{ fontSize: "18px" }}
      >
        <p>{t("profile.loading")}</p>
      </div>
    );
  }

  if (!user) return null;

  const hasAvatar = user.ImageSrc && user.ImageSrc.trim() !== "";
  const hasOrgLogo = user.OrgLogo && user.OrgLogo.trim() !== "";

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 font-tajawal text-gray-900 dark:text-gray-100"
      style={{ fontSize: "18px", lineHeight: "1.6" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Banner */}
          <div className="h-24 sm:h-32 lg:h-40 bg-gradient-to-r from-mainBlue to-indigo-600" />

          {/* Profile header */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 -mt-14 sm:-mt-16 lg:-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              {/* Avatar */}
              {hasAvatar ? (
                <img
                  src={user.ImageSrc}
                  alt={user.username}
                  className="size-24 sm:size-28 lg:size-36 rounded-full ring-4 ring-white dark:ring-gray-800 object-cover bg-gray-200 dark:bg-gray-700 shrink-0"
                />
              ) : (
                <div className="size-24 sm:size-28 lg:size-36 cursor-pointer rounded-full ring-4 ring-white dark:ring-gray-800 bg-gradient-to-br from-mainBlue to-indigo-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {getInitial(user.username)}
                  </span>
                </div>
              )}

              {/* Name & role */}
              <div className="flex-1 min-w-0 sm:pb-2 lg:pb-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white truncate">
                  {user.username}
                </h1>
                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 truncate">
                  {user.email}
                </p>
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-500/20 px-3 py-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                    {user.userTypeName}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-500/20 px-3 py-1 text-sm font-semibold text-amber-700 dark:text-amber-300">
                    {user.UserDepartmentName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <button
            onClick={() => router.push("/change-password")}
            className="text-base sm:text-lg cursor-pointer text-mainBlue dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-bold transition-colors"
          >
            {t("profile.changePassword")}
          </button>
        </div>

        {/* Info sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Personal Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t("profile.personalInfo")}
            </h2>
            <dl className="space-y-4 sm:space-y-5">
              <InfoRow icon={UserCircleIcon} label={t("profile.username")} value={user.username} />
              <InfoRow icon={EnvelopeIcon} label={t("profile.email")} value={user.email} />
              <InfoRow
                icon={IdentificationIcon}
                label={t("profile.userType")}
                value={t("profile.userTypeWithId", { name: user.userTypeName, id: user.UserTypeID })}
              />
              <InfoRow
                icon={ClockIcon}
                label={t("profile.lastActive")}
                value={formatDate(user.lastActive, i18n.language)}
              />
            </dl>
          </div>

          {/* Organization */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t("profile.organization")}
            </h2>

            {/* Org logo */}
            {hasOrgLogo && (
              <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-gray-100 dark:border-gray-700">
                <img
                  src={user.OrgLogo}
                  alt={user.OrgNameEn}
                  className="size-14 sm:size-16 rounded-lg object-contain bg-gray-50 dark:bg-gray-700 p-1.5 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                    {user.OrgNameEn}
                  </p>
                  {user.OrgNameAr && (
                    <p
                      className="text-sm text-gray-500 dark:text-gray-400 truncate"
                      dir="rtl"
                    >
                      {user.OrgNameAr}
                    </p>
                  )}
                </div>
              </div>
            )}

            <dl className="space-y-4 sm:space-y-5">
              <InfoRow
                icon={BuildingOffice2Icon}
                label={t("profile.orgEN")}
                value={user.OrgNameEn}
              />
              <InfoRow
                icon={BuildingOffice2Icon}
                label={t("profile.orgAR")}
                value={user.OrgNameAr}
                dir="rtl"
              />
              <InfoRow
                icon={BuildingOfficeIcon}
                label={t("profile.orgId")}
                value={String(user.UserOrgID)}
              />
              <InfoRow
                icon={BriefcaseIcon}
                label={t("profile.department")}
                value={t("profile.departmentWithId", {
                  name: user.UserDepartmentName,
                  id: user.UserDepartmentID,
                })}
              />
            </dl>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={() => router.push("/")}
            className="text-base cursor-pointer sm:text-lg text-mainBlue dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-bold transition-colors"
          >
            {t("profile.backToDashboard")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component for info rows ──────────────────────────────────
interface InfoRowProps {
  icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
  >;
  label: string;
  value: string;
  dir?: "ltr" | "rtl";
}

function InfoRow({ icon: Icon, label, value, dir }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <Icon
        className="size-5 sm:size-6 text-gray-400 dark:text-gray-500 mt-1 shrink-0"
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <dt className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {label}
        </dt>
        <dd
          className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate mt-0.5"
          dir={dir}
        >
          {value || "—"}
        </dd>
      </div>
    </div>
  );
}
