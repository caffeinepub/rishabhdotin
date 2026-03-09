// Auto-generated backend stub — replaced during canister deployment
// This file satisfies TypeScript module resolution for pure frontend builds.

export interface backendInterface {}

export type CreateActorOptions = {
  agentOptions?: Record<string, unknown>;
};

export class ExternalBlob {
  static fromURL(_url: string): ExternalBlob {
    return new ExternalBlob();
  }
  async getBytes(): Promise<Uint8Array> {
    return new Uint8Array();
  }
  onProgress?: (progress: number) => void;
}

export function createActor(
  _canisterId: string,
  _upload: (blob: ExternalBlob) => Promise<Uint8Array>,
  _download: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
): Promise<backendInterface> {
  return Promise.resolve({});
}
