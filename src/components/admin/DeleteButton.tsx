"use client";

export default function DeleteButton({
  action,
  confirmText = "آیا از حذف این مورد مطمئن هستید؟",
}: {
  action: () => Promise<void>;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50"
      >
        حذف
      </button>
    </form>
  );
}
