export interface AdvancedConfiguration {
	shortlinkMode: ShortlinkModes;
}

export enum ShortlinkModes {
	Random = "random",
	Manual = "manual",
}

export type ErrorType = Error | TypeError | undefined;

export const msgSplitMarker = "#  -----8<----- snip ----->8-----  #"
