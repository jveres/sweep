# Sweep 1.2 review

Sweep 1.2 keeps the connected engineering map and removes the suggestion
that completing its topics establishes maturity. It qualifies claims that
were too broad, distinguishes capabilities from implementation choices,
and makes several references more precise.

This review covers the canonical [Sweep 1.1](../roadmaps/sweep-1.1.md), its
notes and glossary, and the website's framing. The result is a new
[Sweep 1.2](../roadmaps/sweep-1.2.md); earlier editions remain historical
references. Sources below were consulted on September 13, 2026.

## Assessment

The map's strongest feature is its feedback loop: define intended outcomes,
build and verify the product, observe operation, and revisit priorities.
The distinctions between intent and verification are useful, including
accessibility versus accessibility testing and instrumentation versus
operational observation. The update preserves those connections.

The main weakness was the classification. Foundation, applicability, and
scale describe different things. They do not define observable levels of
execution quality. A checked topic might mean that someone selected Git,
ran a test, or believes the team has psychological safety. Those are not
comparable achievements.

The evidence reviewed does not validate a universal adoption sequence or
numerical score. Building such an assessment would require a defined scope,
observable criteria, evidence quality rules, treatment of inapplicability,
and validation with different teams. This edition does not claim to
provide that assessment.

## Classification decision

The update uses two reading cues, defined in the
[reading guidance](../README.md#read-the-map):

- **Review routinely** asks whether a concern is adequately addressed.
- **Context dependent** asks whether a method or investment fits an actual
  need and can be supported.

These remain editorial judgments, with no ranking or maturity meaning.
Risk review moves into routine consideration; particular compliance
obligations still depend on the product. AI assistance, merge queues,
platform engineering, chaos experiments, and profiling become contextual.
Their notes describe needs, prerequisites, and costs rather than assuming
organizational scale is the reason to adopt them.

Trunk-based development, infrastructure as code, and docs-as-code are also
contextual choices. The broader responsibilities for integration,
infrastructure, and documentation remain routine concerns. Documentation
gets its own parent entry so a particular workflow is not mistaken for the
capability itself. Database evolution applies when the product owns
persistent data; an error-budget policy is one way to act on reliability
targets.

The chart remains a reference map containing different kinds of topics.
The website now explains that checkmarks and percentages are personal
tracking aids. A team can record a reason for inapplicability in its own
shared records; the chart does not implement an assessment workflow.

## Focused source audit

The table distinguishes what a source supplies from the editorial action.
A definition explains a term; implementation guidance offers a technique;
research reports findings in a setting. None automatically proves a
universal benefit or adoption requirement.

| Entry | Source role and finding | Change in 1.2 |
|---|---|---|
| Event storming | The [originator's description](https://www.eventstorming.com/) defines a flexible collaborative workshop format. It does not establish comparative superiority over all discovery methods. | Remove the fastest-method claim; identify fragmented domain knowledge as a use case. |
| Docs-as-Code | [Write the Docs](https://www.writethedocs.org/guide/docs-as-code/) describes a workflow using development tools and shared ownership. It does not establish exclusive or guaranteed accuracy. | Describe the workflow as contextual; retain ownership and review responsibilities. |
| Definition of Done | The [Scrum Guide](https://scrumguides.org/scrum-guide.html#commitment-definition-of-done) defines quality conditions for a usable increment. It does not universally require production deployment. | Define the scope and distinguish the quality commitment from a team's deployment requirement. |
| Deployability | The [SEI article](https://www.sei.cmu.edu/blog/two-categories-of-architecture-patterns-for-deployability/) discusses the quality attribute and deployment patterns. These patterns do not establish that every component in every product must deploy separately. | Describe predictable release and recovery; make independent deployment an architectural choice. |
| Threat modeling | [OWASP](https://owasp.org/www-community/Threat_Modeling) describes identifying threats and mitigations through the lifecycle. It does not support a fixed meeting-versus-incident cost comparison. | Remove the cost claim; include model revision and control verification. |
| Artifact provenance | [SLSA provenance](https://slsa.dev/spec/v1.2/provenance) directly defines information about artifact origin. [Build, release, run](https://12factor.net/build-release-run) describes a different concern. | Give each concern its own entry; link provenance to SLSA and distinguish metadata from verified trust. |
| Formatting | [EditorConfig](https://editorconfig.org/) standardizes editor settings. [Prettier](https://prettier.io/docs/why-prettier) is an example of a code formatter. | Explain both roles and preserve exceptions for semantic formatting. Prettier is an example, not a mandated tool. |
| Performance & resilience testing | [Performance testing guidance](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/performance-test) supports load-related checks; [reliability testing guidance](https://learn.microsoft.com/en-us/azure/well-architected/reliability/reliability-test) addresses faults, degradation, and recovery. | Keep the combined topic but link both aspects explicitly. |
| Rollback & roll-forward | [Safe deployment guidance](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments) discusses both recovery choices and stateful changes. [Blue-green deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) is one technique. | Use the broader reference and remove an unconditional preference for corrective releases. |
| Test pyramid | The [practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) is guidance for constructing a test portfolio, not a validated universal quota. | Align the glossary with the note's contextual balance. |
| Psychological safety | The original re:Work URL returns a not-found page. A [Google account of its team research](https://business.google.com/en-all/think/future-of-marketing/five-dynamics-effective-team/) provides the organizational setting. | Repair the reference and limit the research claim to its setting. |
| GitOps | [OpenGitOps](https://opengitops.dev/) defines continuous attempts to reconcile desired state. It does not promise successful or correct reconciliation. | Include failure monitoring and recovery from an incorrect desired state. |
| Incident reviews | [Google's postmortem guidance](https://sre.google/sre-book/postmortem-culture/) defines triggers and acknowledges review cost. | Replace an after-every-incident rule with agreed triggers, ownership, and follow-through. |
| On-call | [Google's on-call chapter](https://sre.google/sre-book/being-on-call/) describes a service support practice with staffing and workload constraints. | Separate service ownership from the support hours and rotation a particular service needs. |
| Chaos engineering | [The principles](https://principlesofchaos.org/) describe experiments and limiting impact; [reliability testing guidance](https://learn.microsoft.com/en-us/azure/well-architected/reliability/reliability-test) also covers safer environments and abort conditions. | State prerequisites and safeguards instead of an advanced-at-scale label. |
| AI assistance | [DORA's AI research collection](https://dora.dev/ai/) is research and adoption guidance, not a universal scale threshold. [Spec Kit](https://github.com/github/spec-kit) is one workflow implementation. | Separate adoption evaluation from agent supervision, context maintenance, and specification workflows. |
| DORA metrics | [DORA's current guide](https://dora.dev/guides/dora-metrics/) names five metrics and cautions against comparing unrelated applications or turning metrics into targets. | Keep the five-metric list; strengthen the scope and interpretation guidance. |

## Other editorial findings

Several recommendations needed limits even without changing their primary
reference. Feature flags control exposure but do not reverse persisted
side effects. A green merge queue only establishes that its checks passed.
Canary rollout sizes and observation periods need to fit the traffic and
risk. These are engineering qualifications, not claims of universal
experimental results.

The update also distinguishes tool output from operational evidence:
scanner findings need triage, an SBOM needs coverage checks, a backup needs
a restore exercise, and an agent's success report needs verification.
Instrumentation and logging notes now include collection cost and sensitive
data handling. These details make the notes more useful without turning
them into exhaustive implementation instructions.

The [improvement guidance](../README.md#choose-an-improvement) adds a small
selection-and-review loop with scope, ownership, evidence, prerequisites,
cost, and a review date. It is a suggested discussion process. It does not
define practice-specific maturity levels or claim to be a complete adoption
method.

## Link checks

An automated pass checked 132 unique source URLs. The original Google
team-effectiveness URL served a not-found page despite an HTTP success
response; its replacement was read directly. The Modern Testing site timed
out, so Quality engineering now uses [DORA’s testing guidance](https://dora.dev/capabilities/test-automation/)
and states which part of the broader concern that source covers.

Three Scrum.org pages denied automated access. The Ownership,
Accountability, and Retrospectives entries now use the corresponding
sections of the accessible [Scrum Guide](https://scrumguides.org/scrum-guide.html).
[Satisfice’s exploratory testing page](https://www.satisfice.com/exploratory-testing)
returned HTTP 406 to the command-line check, but its content was retrieved
and read through web browsing. That link is retained. These results do not
imply that access restrictions are broken links.

A final pass covered 137 unique external URLs across the new roadmap,
README, and this review, reusing successful earlier checks. All returned
HTTP success except the Satisfice restriction described above. Local file
links also resolved. HTTP success alone cannot detect every soft error or
validate an anchor or a claim.

## Verification

All three editions parse and build: 1.0 has 91 topics, 1.1 has 125, and 1.2
has 127. The new edition adds Documentation and Build & release separation.
The earlier source files remain unchanged. Typechecking passes. Lint reports
the two existing CSS specificity warnings; the production build retains its
bundle-size warning.

Browser checks covered desktop and mobile rendering, the new tag legend,
keyboard selection of a revised note, its supplementary reference link,
and switching editions with separate storage keys. No loading errors or
page-level horizontal overflow were observed.

## Limits and follow-up

This is a focused audit of strong claims, source mismatches, classification,
and internal consistency. It is not a systematic literature review, a
security or compliance assessment, or a verification of every claim in
every linked source. Link availability checks establish reachability, not
source quality or agreement with a summary.

A useful next review is a trial with teams operating different kinds of
products. Ask whether they can identify a relevant concern, select a
proportionate change, produce evidence, and decide whether it helped.
Record confusing classifications and missing prerequisites before expanding
the map further.
