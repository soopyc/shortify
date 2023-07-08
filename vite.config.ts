import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { exec } from 'child_process';
import { promisify } from 'util';

const _p_exec = promisify(exec);

export default defineConfig(async () => {

	// ideally this is only run once on build
	let [_git_rev, _git_commit] = (
		await Promise.allSettled([
			_p_exec('git describe --always --dirty --broken'),
			_p_exec('git rev-parse HEAD'),
		])
	).map(result => {
		if (result.status == "rejected") {
			return "unknown"
		} else {
			return result.value.stdout.trim()
		}
	})

	return {
		plugins: [sveltekit()],
		define: {
			APP_VER: `"${_git_rev}"`,
			APP_COMMIT: `"${_git_commit}"`
		}
	};
});
