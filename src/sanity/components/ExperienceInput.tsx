"use client";

import { useEffect, useState } from "react";
import { Button, Card, Stack, Text } from "@sanity/ui";
import {
  useDocumentOperation,
  useDocumentOperationEvent,
  useDocumentPairPermissions,
  type ObjectInputProps,
} from "sanity";
import { ConfirmDeleteDialog, useDocumentPane } from "sanity/structure";

export function ExperienceInput(props: ObjectInputProps) {
  const pane = useDocumentPane();
  const { setIsDeleting } = pane;
  const { delete: deleteOperation } = useDocumentOperation(pane.documentId, pane.documentType);
  const event = useDocumentOperationEvent(pane.documentId, pane.documentType);
  const [permissions, permissionsLoading] = useDocumentPairPermissions({
    id: pane.documentId,
    type: pane.documentType,
    permission: "delete",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (event?.type === "error" && event.op === "delete") {
      setDeleting(false);
      setIsDeleting(false);
      setError("Could not delete this experience. Please try again.");
    }
  }, [event, setIsDeleting]);

  const disabled = permissionsLoading || !permissions?.granted ||
    !!deleteOperation.disabled || deleting || pane.connectionState !== "connected" ||
    !!pane.selectedReleaseId || !!pane.revisionId;

  return (
    <Stack space={4}>
      <Card padding={3} border radius={2}>
        <Stack space={3}>
          <Button
            text={deleting ? "Deleting experience…" : "Delete experience"}
            tone="critical"
            mode="ghost"
            disabled={disabled}
            onClick={() => { setError(null); setConfirmOpen(true); }}
          />
          {error && <Text size={1}>{error}</Text>}
        </Stack>
      </Card>
      {props.renderDefault(props)}
      {confirmOpen && (
        <ConfirmDeleteDialog
          id={pane.editState?.draft?._id || pane.documentId}
          type={pane.documentType}
          action="delete"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            if (disabled) return;
            setConfirmOpen(false);
            setDeleting(true);
            setIsDeleting(true);
            deleteOperation.execute();
          }}
        />
      )}
    </Stack>
  );
}
