import React from "react";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ReviewActionsProps {
  editing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ReviewActions({ editing, isLoading, onEdit, onDelete, onSave, onCancel }: ReviewActionsProps) {
  return (
    <Flex justifyContent="flex-end" gap={2} mb={2}>
      {editing ? (
        <>
          <Tooltip label="Save" aria-label="Save tooltip">
            <IconButton
              icon={<CheckIcon className="h-5 w-5" />}
              colorScheme="blue"
              onClick={onSave}
              isLoading={isLoading}
              aria-label="Save review"
            />
          </Tooltip>
          <Tooltip label="Cancel" aria-label="Cancel tooltip">
            <IconButton
              icon={<XMarkIcon className="h-5 w-5" />}
              colorScheme="gray"
              onClick={onCancel}
              aria-label="Cancel edit"
            />
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip label="Edit" aria-label="Edit tooltip">
            <IconButton
              icon={<PencilIcon className="h-5 w-5" />}
              colorScheme="blue"
              onClick={onEdit}
              aria-label="Edit review"
            />
          </Tooltip>
          <Tooltip label="Delete" aria-label="Delete tooltip">
            <IconButton
              icon={<TrashIcon className="h-5 w-5" />}
              colorScheme="red"
              onClick={onDelete}
              aria-label="Delete review"
            />
          </Tooltip>
        </>
      )}
    </Flex>
  );
}
