import type { EnrichedLead } from "@sa/shared";
import { log } from "../lib/logger.js";
import type { LeadSink } from "./types.js";

/** Sink cho môi trường local/staging: in lead ra log. */
export class ConsoleSink implements LeadSink {
  readonly name = "console";

  async send(lead: EnrichedLead): Promise<void> {
    log("info", "lead.console_sink", { lead });
  }
}
