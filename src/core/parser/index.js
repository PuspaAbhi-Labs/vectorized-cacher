function parse(statement, lineNumber = 1) {
  // Trim and clean up multiple spaces
  const expressions = statement.trim().split(" ").filter(Boolean);

  const [commandRaw, key, value, ...extra] = expressions;

  if (!commandRaw || !key) {
    throw new SyntaxError(
      `(line ${lineNumber}): Command and key are required.\n → ${statement}`
    );
  }

  if (extra.length > 0) {
    throw new Error(
      `Syntax Error (line ${lineNumber}): Too many arguments.\n → ${statement}`
    );
  }

  const command = commandRaw.toUpperCase();

  // Define the command behavior
  const commandRules = {
    SET: { requiresValue: true, allowValue: true },
    GET: { requiresValue: false, allowValue: false },
    DELETE: { requiresValue: false, allowValue: false },
    // Add more commands here if needed
    // UPDATE: { requiresValue: true, allowValue: true }
  };

  const rule = commandRules[command];

  if (!rule) {
    throw new Error(`Unknown Command (line ${lineNumber}): "${commandRaw}"`);
  }

  if (rule.requiresValue && !value) {
    throw new Error(
      `Syntax Error (line ${lineNumber}): ${command} requires a value.\n → ${statement}`
    );
  }

  if (!rule.allowValue && value) {
    throw new Error(
      `Syntax Error (line ${lineNumber}): ${command} does not take a value.\n → ${statement}`
    );
  }

  return {
    command,
    key,
    value: value || null,
  };
}

try {
  console.log(parse("SET foo bar"));
  console.log(parse("get foo"));
  console.log(parse("DELETE foo"));
  console.log(parse("SET foo"));        // This will throw error
} catch (e) {
  console.error(e.message);
}