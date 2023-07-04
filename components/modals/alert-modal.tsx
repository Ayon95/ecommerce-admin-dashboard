"use client";

import React from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModalProps) {
  return (
    <Modal
      title="Are you sure you want to delete?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mt-5 flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onConfirm}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
