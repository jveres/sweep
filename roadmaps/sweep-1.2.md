---
roadmap:
  noteMarkers: true
  theme:
    preset: pro
  background:
    enabled: true
    seed: sweep-1.2
    density: 0.55
    size: 0.8
    animated: 1.5
  tags:
    review:
      icon: check
      accent: green
      label: Review routinely
    contextual:
      icon: ":bulb:"
      accent: blue
      label: Context dependent
---

# Sweep 1.2 — Software Engineering ++_Essential Practices_++ :broom:

:boom: **SWEEP 1.2** connects discovery, delivery, and operations.
[review] marks concerns to revisit; [contextual] marks choices driven by need.
These are discussion prompts, not maturity levels or an adoption sequence.

* :one: Discovery & Design
*:beginner: [Product discovery](https://www.svpg.com/product-discovery/) is **crucial** to success. Involve your customers and key stakeholders — discovery decides ==_what_== to create.*
  + [Domain discovery](https://www.infoq.com/articles/architecture-modernization-domain-driven-discovery/) [contextual]
    > Before designing anything, learn the business terrain: which domains exist, where their
    > boundaries run, and which ones differentiate you. InfoQ's field guide shows how to run
    > this discovery.
    * [Capability mapping](https://microservices.io/patterns/decomposition/decompose-by-business-capability.html) [contextual]
      > Name what the business must be able to do, independent of any system — those
      > capabilities become candidate module and team boundaries. Richardson's pattern shows the
      > technique.
    * [Context mapping](https://www.infoq.com/articles/ddd-contextmapping/) [contextual]
      > Your domains will overlap and translate badly at the seams; map the bounded contexts and
      > their relationships early, because every seam is a future integration contract.
    * [Event storming](https://www.eventstorming.com/) [contextual]
      > When domain knowledge is fragmented, bring engineers and domain experts
      > together to map events, disagreements, and open questions. Choose a
      > workshop scope and facilitator suited to the problem; the format
      > supports exploration rather than proving a design correct.
  * [Product design](https://www.nngroup.com/articles/design-thinking/) [review]
    > Shape what you build around evidence from users, not opinions in meetings. Design
    > thinking's cycle — empathize, define, ideate, prototype, test — is the loop to
    > internalize.
    * [UI/UX prototyping](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/) [contextual]
      > Test the flow while it is still cheap to change: an interactive prototype answers
      > usability questions before implementation begins.
    * [User story mapping](https://www.jpattonassociates.com/story-mapping/) [contextual]
      > Flat backlogs hide the product; arrange stories along the user's journey instead, so
      > releases slice into thin end-to-end walking skeletons. Jeff Patton invented the
      > technique.
    * [Impact mapping](https://www.impactmapping.org/) [contextual]
      > Connect proposed work to a goal, the people who can influence it, and
      > the behavior changes you expect. Treat those links as hypotheses to
      > test; revisit work whose contribution remains unclear.
    * [Design sprint](https://designsprintkit.withgoogle.com) [contextual]
      > For a consequential, uncertain question, run a focused workshop to prototype and test a
      > possible answer before committing the team to implementation.
    * [Design systems](https://www.designsystems.com/) [contextual]
      > Shared components, tokens, and guidance improve consistency and reduce repeated design
      > and implementation work when a product family benefits from standardization.
    * [Accessibility](https://www.w3.org/WAI/standards-guidelines/wcag/) [review]
      > Include accessibility from the first wireframe so it shapes flows, content, and
      > components. WCAG defines the shared standard; verification is accessibility testing's
      > job in chapter two.
    * [Product analytics](https://www.gov.uk/service-manual/measuring-success) [review]
      > Define success measures before delivery and instrument them with appropriate consent —
      > the outcome reviews in chapter three depend on these signals existing.
    * [Customer feedback](https://www.gov.uk/service-manual/user-research) [review]
      > Combine interviews, support signals, usability studies, and behavioral evidence. Feed
      > what you learn back into discovery instead of treating release as the finish line.
  * [Requirements & outcomes](https://en.wikipedia.org/wiki/Requirements_engineering) [review]
    > Translate discovery into testable outcomes, constraints, and evidence. Requirements stay
    > useful when each one has an owner, rationale, and way to verify it.
    * [Functional requirements](https://en.wikipedia.org/wiki/Functional_requirement) [review]
      > Describe the behavior users and dependent systems need without prescribing unnecessary
      > implementation details.
    * [Quality attributes](https://en.wikipedia.org/wiki/Non-functional_requirement) [review]
      > The classic NFRs: make performance, reliability, security, accessibility, privacy, and
      > operability measurable; these constraints often shape architecture more than features
      > do.
    * [Acceptance criteria](https://gojko.net/books/specification-by-example/) [review]
      > Describe observable examples of expected behavior, including important
      > failure paths and boundary conditions. Use them as evidence for the
      > agreed scope; passing examples cannot establish every quality attribute.
    * [Risk & compliance](https://csrc.nist.gov/projects/risk-management) [review]
      > Review safety, privacy, security, legal, and business risks for each
      > product. Record which obligations apply, who interprets them, and how
      > they will be verified. The depth of controls depends on the actual
      > exposure and obligations.
    * [Traceability](https://en.wikipedia.org/wiki/Requirements_traceability) [contextual]
      > Connect important requirements to design decisions, tests, releases, and operational
      > evidence when the product's risk or regulation demands it.
  * [Technical design](https://martinfowler.com/architecture/) [review]
    > Decide the shapes that are expensive to change — boundaries, data ownership, communication
    > — and postpone everything else. Fowler's guide frames which decisions deserve the effort.
    * [Visual communication](https://c4model.com/) [review]
      > An architecture nobody can see is an architecture nobody can critique. C4's four zoom
      > levels give the team one drawing convention from bird's-eye view to code.
    * [Technology scouting](https://www.thoughtworks.com/radar) [contextual]
      > Watch the landscape deliberately instead of adopting whatever trends: assess, trial,
      > adopt, hold. The ThoughtWorks Radar models the discipline twice a year.
    * [API design-first](https://www.infoq.com/articles/design-first-api-development/) [contextual]
      > Agree the contract before writing the implementation: consumers review it, mocks unblock
      > parallel work, and the API ends up shaped by its users rather than your database.
    * [ADRs](https://adr.github.io/) [review]
      > Future maintainers will ask why — answer them now, in a one-page record per significant
      > decision, with the context and the trade-offs that drove it.
    * [Threat modeling](https://owasp.org/www-community/Threat_Modeling) [review]
      > Identify assets, trust boundaries, threats, and possible mitigations
      > while design choices remain open. Revisit the model as the system
      > changes and verify the selected controls; early review can reduce
      > rework, but it does not guarantee that incidents are prevented.
  * [Team spirit](https://www.atlassian.com/team-playbook) [review]
    > Make room for questions, disagreement, and shared decisions. Review how
    > trust, autonomy, and working conditions affect the team’s ability to use
    > these practices; adding ceremonies alone does not establish those
    > conditions.
    * [Psychological safety](https://business.google.com/en-all/think/future-of-marketing/five-dynamics-effective-team/) [review]
      > Create conditions where people can ask questions, challenge assumptions,
      > and report mistakes without humiliation. Google’s team research
      > identified psychological safety as an important factor in its setting;
      > treat it as a reason to investigate your team’s experience, not a
      > universal performance ranking.
    * [Empowerment](https://www.svpg.com/empowered-product-teams/) [review]
      > Give teams clear outcomes, constraints, and authority to explore
      > solutions. Agree which decisions they own and where coordination or
      > specialist review is needed; autonomy still needs direction and
      > feedback.
    * [Ownership](https://scrumguides.org/scrum-guide.html#scrum-team) [review]
      > Give a team responsibility for a defined product or service, access to
      > its users and operational evidence, and authority to improve it. Make
      > responsibilities shared with other teams explicit.
    * [Accountability](https://scrumguides.org/scrum-guide.html#developers) [review]
      > The counterpart of autonomy: a professional team holds itself to its own definition of
      > done and answers for outcomes, not activity.
    * [Aligned objectives](https://www.svpg.com/team-objectives-overview/) [review]
      > Autonomous teams still need one direction: outcome-based objectives, assigned with
      > context, keep ten empowered teams from pulling in ten directions.

* :two: Development & Delivery
*:beginner: [Software engineers](https://en.wikipedia.org/wiki/Software_engineering) build quality into every change. Fast feedback, small batches, automation, and shared ownership decide ==_how_== the product is created.*
  * [Developer Experience](https://developerexperience.io/articles/good-developer-experience) [review]
    > Look for slow feedback, confusing workflows, and avoidable cognitive load.
    > Improve the most consequential friction and check whether the change helps
    > developers complete useful work; account for the maintenance cost of added
    > tooling.
  * [DevOps](https://martinfowler.com/bliki/DevOpsCulture.html) [review]
    > Share responsibility for delivery and operation across development and
    > operations. Agree ownership and feedback paths suited to the product; this
    > does not require every developer to join a 24-hour support rotation.
  * [Team Topologies](https://teamtopologies.com/) [contextual]
    > Organize teams for fast flow: stream-aligned teams own value end to end, platform and
    > enabling teams reduce their load, and interaction modes are chosen deliberately.
  * [Quality engineering](https://dora.dev/capabilities/test-automation/) [review]
    > Build quality into design, implementation, verification, and operation.
    > Share responsibility across the team and retain independent review where
    > needed. DORA’s testing guidance describes the delivery feedback part of
    > this responsibility; quality also depends on the other concerns here.
    * [Acceptance & exploratory testing](https://www.satisfice.com/exploratory-testing) [review]
      > Use [acceptance
      > examples](https://gojko.net/books/specification-by-example/) to check
      > agreed behavior and exploratory testing to investigate risks and
      > surprises. Select automation where repeatability helps, and preserve
      > time for investigation beyond scripted checks.
    * [Performance & resilience testing](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/performance-test) [review]
      > Validate latency, throughput, and resource use against explicit workload
      > targets. Also test degradation and recovery through a [reliability
      > testing
      > strategy](https://learn.microsoft.com/en-us/azure/well-architected/reliability/reliability-test);
      > load tests alone do not establish resilience.
    * [Accessibility testing](https://www.w3.org/WAI/test-evaluate/) [review]
      > Combine automated checks, keyboard and screen-reader evaluation, and testing with people.
      > Automation alone cannot establish that an experience is accessible.
    * [Security testing](https://owasp.org/www-project-devsecops-guideline/) [review]
      > Build security verification into everyday delivery: automated checks in the pipeline,
      > human review where risk concentrates. The specific controls and probes are defined by
      > the security practices in chapter three.
    * [Test data & environments](https://12factor.net/dev-prod-parity) [review]
      > Create representative, isolated, privacy-safe data and reproducible environments. Define
      > ownership for flaky tests instead of normalizing unreliable feedback.
  * [Code review](https://google.github.io/eng-practices/review/) [review]
    > Match review rigor to risk. Pull-request review, pairing, and ensemble work can all provide
    > correctness checks, shared ownership, and knowledge transfer without stalling flow.
  * [Branching strategy](https://martinfowler.com/articles/branching-patterns.html) [review]
    > Choose how changes integrate and how supported releases are maintained.
    > Keep integration feedback fast and make the cost of long-lived branches
    > visible; the strategy needs to fit the release model.
    * [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/) [contextual]
      > Consider release and hotfix branches when maintaining multiple supported
      > versions requires them. The original author recommends simpler workflows
      > for continuously delivered products; weigh coordination cost before
      > adopting this model.
    * [Trunk-based](https://trunkbaseddevelopment.com/) [contextual]
      > Integrate small changes into the main line frequently and keep it
      > working. Short-lived branches and feature flags can support this
      > approach; avoid treating a branch name as evidence of continuous
      > integration.
  * [CI/CD](https://continuousdelivery.com/) [review]
    > Integrate changes frequently and automate builds, checks, and release
    > preparation. Continuous delivery keeps software releasable; continuous
    > deployment also releases passing changes automatically. Choose release
    > controls for the product’s risks.
    * [Commit semantics](https://www.conventionalcommits.org/en/v1.0.0/) [contextual]
      > Structured commit messages (feat:, fix:, breaking) turn history into data — changelogs
      > and releases generate themselves.
    * [Feature flags](https://martinfowler.com/articles/feature-toggles.html) [contextual]
      > Use flags when deployment and user exposure need separate control. Test
      > relevant flag states and assign cleanup ownership. Disabling a feature
      > can limit exposure, but it does not undo data writes or other side
      > effects.
    * [Merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue) [contextual]
      > When concurrent merges frequently invalidate each other’s checks,
      > validate proposed merge groups against current main. Measure queue time
      > and CI cost; passing checks only cover the failures those checks can
      > detect.
    * [Configuration management](https://12factor.net/config) [review]
      > Keep environment-specific configuration outside code, validate it, protect sensitive
      > values, and promote the same immutable artifact through each environment.
    * [Build & release separation](https://12factor.net/build-release-run) [review]
      > Separate building an artifact, binding release configuration, and running
      > the release. Promote the tested artifact where the target permits it, and
      > give each release an identity that supports investigation and recovery.
    * [Artifact provenance](https://slsa.dev/spec/v1.2/provenance) [review]
      > Record verifiable information tying an artifact to its source, build
      > process, and inputs. Check provenance against a trusted builder and
      > policy before use; metadata alone does not establish trust. SLSA defines
      > the model and verification guidance.
    * [Database evolution](https://martinfowler.com/articles/evodb.html) [contextual]
      > When the product owns persistent data, test schema and data changes with
      > the application versions that can coexist. Plan compatible expansion,
      > migration, and cleanup steps; rehearse recovery before destructive
      > changes.
    * [Progressive delivery](https://launchdarkly.com/blog/what-is-progressive-delivery-all-about/) [contextual]
      > Use staged exposure when the product can route users or workloads
      > separately and collect meaningful feedback. Choose cohorts, observation
      > windows, and stop conditions based on risk and traffic; there is no
      > universal starting percentage.
    * [Release verification](https://sre.google/workbook/canarying-releases/) [review]
      > Run automated smoke tests and health checks after deployment, then stop or reverse a
      > rollout when user and system signals breach its guardrails.
    * [Rollback & roll-forward](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments) [review]
      > Plan and rehearse recovery from a harmful release. Choose rollback or a
      > corrective release using the failure, time to recover, and compatibility
      > of code, configuration, and data. Neither path is automatically safe
      > after state changes.
  * [DoD](https://scrumguides.org/scrum-guide.html#commitment-definition-of-done) [review]
    > Agree the quality conditions a usable increment must meet, including
    > relevant review, tests, and documentation. In Scrum, Done is a quality
    > commitment; production deployment is not a universal requirement. State
    > explicitly whether your team includes it.
  * [Source control](https://en.wikipedia.org/wiki/Version_control) [review]
    > Everything that produces the product lives in version control — code, configuration,
    > documentation, infrastructure — with a history that explains itself.
    * [Git](https://git-scm.com) [contextual]
      > Learn the team's source-control system beyond commit and push. History, bisect, and
      > recovery tools shorten diagnosis when a change causes a failure.

  * [Architecture patterns](https://en.wikipedia.org/wiki/Architectural_pattern) [contextual]
    > Layers, events, microservices — patterns are a vocabulary of trade-offs, not badges; know
    > them well enough to pick the boring one that fits.
  * [Coding conventions](https://en.wikipedia.org/wiki/Coding_conventions) [review]
    > Consistency is a team feature: shared conventions make every file feel familiar and free
    > reviews to discuss substance instead of style.
    * [Linting](https://en.wikipedia.org/wiki/Lint_(software)) [review]
      > Automate checks for selected error patterns and convention violations.
      > Tune rules to the codebase and keep false positives manageable; a
      > passing linter does not establish correctness.
    * [Formatting](https://prettier.io/docs/why-prettier) [review]
      > Use a formatter that understands the language and check its output in
      > CI. [EditorConfig](https://editorconfig.org/) shares editor settings
      > such as indentation and line endings; it is not a full code formatter.
      > Exclude files whose syntax gives formatting semantic meaning.
    * [Coding style](https://google.github.io/styleguide/) [review]
      > Where conventions need judgment — naming, idioms, structure — write them down. Google's
      > public style guides show what battle-tested guidance looks like.
  * [Refactoring](https://refactoring.com/) [review]
    > Improve structure in small, behavior-preserving steps as part of daily work — not as a
    > big-bang project you must ask permission for. Fowler's catalog names the moves.
  * [Versioning](https://en.wikipedia.org/wiki/Software_versioning) [review]
    > Give every release an identity: a scheme that communicates change, compatibility, and
    > support expectations to everyone downstream.
    * [Semver](https://semver.org/) [contextual]
      > When software declares a public API, MAJOR.MINOR.PATCH communicates compatible and
      > breaking changes. Products without a public API can use a scheme suited to their release
      > and support model.
    * [Deprecation & end of life](https://endoflife.date/) [review]
      > Publish migration paths and support windows before removing an interface, runtime, or
      > product version. Track adoption until retirement is safe.
  * [Dependency management](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html) [review]
    > Inventory direct and transitive dependencies, review updates and
    > unsupported components, and test compatibility. Prioritize vulnerabilities
    > by exposure, exploitability, and impact as well as scanner findings;
    > assign responsibility for remediation.
  * [Instrumentation](https://opentelemetry.io/docs/concepts/instrumentation/) [review]
    > Design signals around diagnostic questions and user journeys. Combine
    > automatic and explicit instrumentation where useful; control sensitive
    > data, cardinality, and collection cost before relying on telemetry in
    > operations.
    * [OpenTelemetry](https://opentelemetry.io/) :telescope: [contextual]
      > OpenTelemetry standardizes traces, metrics, logs, and context propagation. Check signal
      > and language maturity, semantic conventions, and backend compatibility before adopting
      > it.
  * [Documentation](https://www.writethedocs.org/guide/) [review]
    > Keep the information users, maintainers, and operators need to act. Assign
    > owners and review triggers, and validate important instructions against the
    > product. Choose a workflow that the contributors can maintain.
    * [Docs-as-Code](https://www.writethedocs.org/guide/docs-as-code/) [contextual]
      > Use version control, review, and automated publication when they fit the
      > documentation and its contributors. Keep content ownership and review
      > triggers explicit; sharing the code workflow helps coordination but cannot
      > guarantee accuracy.
      * [Markdown](https://www.markdownguide.org/) [contextual]
        > The lingua franca of docs-as-code: plain text that diffs, reviews, and renders
        > everywhere.
  * [Testability](https://martinfowler.com/testing/) [review]
    > Design code so it can be tested — seams, injectable dependencies, honest boundaries;
    > testability pressure is design feedback, not overhead.
    * [TDD](https://martinfowler.com/bliki/TestDrivenDevelopment.html) [contextual]
      > Red, green, refactor: writing the test first forces the design conversation before the
      > implementation hardens, and leaves a regression net behind.
    * [Contract testing](https://docs.pact.io/) [contextual]
      > When components evolve separately, verify the interactions consumers
      > depend on against providers. Keep contracts current and complement them
      > with other integration checks; contract tests cannot establish every
      > end-to-end behavior.
    * [Test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) [contextual]
      > Use a context-appropriate mix of fast focused tests, integration tests, and end-to-end
      > tests. Keep feedback fast, cover real boundaries, and avoid duplicating the same checks.
  * [Deployability](https://www.sei.cmu.edu/blog/two-categories-of-architecture-patterns-for-deployability/) [review]
    > Design deployment units that can be released predictably, verified, and
    > recovered within acceptable disruption. Independent service deployment is
    > one option; a modular monolith can also be deployable. Test the actual
    > release and recovery process.
  * [AI-assisted engineering](https://dora.dev/ai/) [contextual]
    > Evaluate AI assistance on representative work using quality, delivery
    > time, review effort, and total cost. Decide where it helps within the
    > team’s verification and data-handling constraints; useful adoption is not
    > tied to organizational scale.
    * [Coding agents](https://martinfowler.com/articles/exploring-gen-ai.html) [contextual]
      > For tools that plan, edit, or run commands, define task boundaries,
      > permissions, and expected checks. Review the resulting changes and
      > observed test results, including actions outside the code diff; an
      > agent’s report is not verification by itself.
    * [Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) [contextual]
      > When using agents, maintain the instructions, project knowledge, and
      > tool access needed for the task. Keep context current and appropriately
      > scoped; distinguish trusted instructions from external content and
      > measure whether added context improves results.
    * [Spec-driven development](https://github.com/github/spec-kit) [contextual]
      > Consider a specification-led workflow when acceptance rules and
      > constraints need to be explicit before implementation. Keep the
      > specification, tests, and code aligned as discoveries change the design.
      > Spec Kit is one implementation of this approach.
  * [DORA metrics](https://dora.dev/guides/dora-metrics/) [review]
    > Track change lead time, deployment frequency, failed deployment recovery
    > time, change fail rate, and deployment rework rate. Use trends for one
    > application or service to investigate improvement alongside user outcomes;
    > avoid ranking individuals or unrelated teams.

---
*:checkered_flag: You can build and ship with confidence — now keep it running.*

* :three: Deployment & Operations
*:beginner: High-quality software can ship frequently and safely — and stay ==_running_==. [DevSecOps](https://www.redhat.com/en/topics/devops/what-is-devsecops) provides continuous delivery and deployment capabilities by bringing development, security, and operations together.*
  + [Infrastructure](https://aws.amazon.com/architecture/well-architected/) [review]
    > Run on foundations you can reason about: the Well-Architected pillars — operations,
    > security, reliability, performance, cost, sustainability — are the checklist for this
    > whole column.
    * [Infrastructure as code](https://martinfowler.com/bliki/InfrastructureAsCode.html) [contextual]
      > For infrastructure you control, version and review repeatable
      > definitions. Test provisioning and recovery, and capture emergency
      > changes afterward. Clarify which responsibilities belong to your team
      > and which belong to a managed service provider.
    * [GitOps](https://opengitops.dev/) [contextual]
      > Use versioned desired state and automated reconciliation when the
      > environment supports it. Controllers attempt to apply that state;
      > monitor reconciliation failures and plan recovery when the desired
      > configuration itself is wrong.
    * [FinOps](https://www.finops.org/) [contextual]
      > Cloud spend is an engineering signal: give teams visibility and ownership of their cost,
      > and efficiency becomes part of design instead of a finance escalation.
    * [Platform engineering](https://platformengineering.org/) [contextual]
      > Consider an internal platform when recurring needs across teams justify
      > a maintained shared product. Start with demonstrated user demand,
      > measure adoption and reduced friction, and fund support; a platform is
      > not a required stage for every organization.
    * [Auto-scaling](https://en.wikipedia.org/wiki/Autoscaling) [contextual]
      > When demand varies enough to justify it, scale capacity within tested limits and retain
      > headroom for bursts. Predictable or stateful workloads may need a different strategy.
    * [Green operations](https://greensoftware.foundation/) [contextual]
      > Measure and reduce the energy and carbon cost of software where the workload and
      > organizational goals make it material. The Green Software Foundation collects patterns.
  * [Reliability](https://learn.microsoft.com/en-us/azure/well-architected/reliability/design-patterns) [review]
    > Assume everything fails and design for it: retries with backoff, bulkheads, circuit
    > breakers — Microsoft's pattern catalog is a practical menu.
    * [Self-healing](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/self-healing) [contextual]
      > Automate recovery for understood failure modes when health checks and
      > recovery actions can be tested. Bound retries and restarts, preserve
      > diagnostic evidence, and provide escalation when automation cannot
      > restore service.
    * [SRE](https://sre.google/) [contextual]
      > Operations as a software problem: engineers automate away toil and error budgets decide
      > when to ship versus stabilize. Google's free SRE books define the discipline.
    * [SLOs](https://sre.google/sre-book/service-level-objectives/) [review]
      > Pick the reliability level users actually need, measure it, and spend the error budget
      > deliberately — SLOs turn 'is it reliable enough?' into an engineering decision.
      * [SLIs](https://sre.google/workbook/implementing-slos/) [review]
        > Measure user-visible success, latency, freshness, correctness, or durability with
        > service-level indicators that have precise event, population, and aggregation rules.
      * [Error budgets](https://sre.google/workbook/error-budget-policy/) [contextual]
        > Use the permitted unreliability to balance delivery and stability. Agree in advance
        > what action the team takes when the budget is at risk or exhausted.
    * [Capacity & performance engineering](https://sre.google/workbook/managing-load/) [review]
      > Forecast demand, measure saturation, test limits, and preserve headroom. Performance is a
      > design constraint and an operational responsibility, not a late optimization.
    * [Chaos engineering](https://principlesofchaos.org/) [contextual]
      > Use controlled experiments to investigate specific resilience questions.
      > Establish observable steady-state behavior, limit impact, define abort
      > conditions, and test recovery before wider exposure. Start in a safer
      > environment when it can answer the question.
    * [Service ownership & on-call](https://sre.google/sre-book/being-on-call/) [review]
      > Assign ownership, support hours, and escalation paths to each production
      > service based on user needs and impact. Where on-call coverage is
      > required, make it sustainable and give responders authority and time to
      > improve the service.
    * [Runbooks](https://sre.google/workbook/on-call/) [review]
      > Link actionable diagnosis, mitigation, communication, and escalation guidance from each
      > alert. Test runbooks during exercises and update them after incidents.
    * [Incident response](https://sre.google/sre-book/managing-incidents/) [review]
      > When production breaks, structure beats heroics: clear roles, one incident commander,
      > calm communication. Practice the choreography before you need it.
    * [Blameless postmortems](https://sre.google/sre-book/postmortem-culture/) [review]
      > Agree review triggers such as serious user impact, data loss, or
      > repeated failures. Examine contributing conditions without blaming
      > individuals, assign improvement owners, and check follow-through. Match
      > the review effort to the learning opportunity.
    * [Backup and restore](https://sre.google/sre-book/data-integrity/) [review]
      > For data that needs recovery, protect backup copies from the failures
      > and access paths that threaten the live system. Rehearse restoration and
      > verify completeness, integrity, and recovery time against the agreed
      > targets.
    * [Disaster recovery](https://learn.microsoft.com/en-us/azure/well-architected/reliability/disaster-recovery) [review]
      > Define RTOs and RPOs from business impact, design recovery for infrastructure, data,
      > identity, and dependencies, and run realistic recovery exercises on a schedule.
  * [Security](https://owasp.org/) [review]
    > Security is a property of the whole pipeline, not a final gate: shift it left into design,
    > dependencies, and deployment. OWASP is the community hub for all of it.
    * [Secure development lifecycle](https://csrc.nist.gov/projects/ssdf) [review]
      > Prepare the organization, protect source and build environments, produce secure
      > software, and respond to vulnerabilities through one risk-based development framework.
      * [Security requirements](https://cheatsheetseries.owasp.org/cheatsheets/Abuse_Case_Cheat_Sheet.html) [review]
        > Turn the risks and obligations identified during discovery into verifiable controls
        > and abuse cases; track important decisions with the rest of the requirements.
      * [Application security controls](https://owasp.org/www-project-application-security-verification-standard/) [review]
        > Design and verify authentication, authorization, session management, input handling,
        > output encoding, cryptography, and error handling at the required assurance level.
      * [Data protection & privacy](https://www.nist.gov/privacy-framework) [review]
        > Classify data, minimize collection and retention, encrypt it appropriately, restrict
        > access, and make deletion and consent requirements part of the design.
      * [Secure coding & review](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/) [review]
        > Train engineers for the risks in their stack, use approved security patterns, and
        > review high-risk code paths with appropriate expertise.
      * [Vulnerability response](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html) [review]
        > Provide a reporting channel, triage by exploitability and impact, patch within defined
        > targets, notify affected parties, and learn from recurring root causes.
    * [Penetration testing](https://owasp.org/www-project-web-security-testing-guide/) [contextual]
      > Invite the attack before attackers do: regular authorized probes find what reviews and
      > scanners miss. OWASP's testing guide is the playbook.
    * [Vulnerability scanning](https://owasp.org/www-community/Vulnerability_Scanning_Tools) [review]
      > Scan relevant code, dependencies, and deployable artifacts for known
      > weaknesses. Triage findings against actual exposure and impact, track
      > fixes, and verify remediation; scanners have both blind spots and false
      > positives.
    * [Secrets management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) [review]
      > Keep secrets out of committed source and ordinary logs or chat. Use
      > managed storage and controlled injection, restrict and audit access, and
      > define rotation and revocation appropriate to the credential and
      > exposure.
    * [Supply chain security](https://slsa.dev/) [review]
      > Protect source, dependencies, build systems, and artifacts against
      > tampering. Use controls appropriate to the threat model and verify the
      > evidence they produce; SLSA provides graduated assurance requirements
      > rather than a guarantee about every dependency.
    * [SBOM](https://www.cisa.gov/sbom) [review]
      > Generate a component inventory for each releasable artifact and connect
      > it to vulnerability response. Check its coverage and update it with the
      > build; an inventory helps investigation but does not prove
      > exploitability or absence of risk.
    * [Zero trust](https://csrc.nist.gov/pubs/sp/800/207/final) [contextual]
      > Never trust by network location: authenticate and authorize every access explicitly, as
      > if the perimeter were already breached — NIST 800-207 is the reference architecture.
  * [Observability](https://opentelemetry.io/docs/concepts/observability-primer/#what-is-observability) [review]
    > Use telemetry and investigation tools to infer relevant internal conditions from system
    > outputs. Design signals around user journeys and diagnostic questions, not data volume.
    * [Metrics collection](https://opentelemetry.io/docs/concepts/signals/metrics/) [review]
      > Aggregated measurements power dashboards, alerts, and capacity planning — capture them
      > consistently and they become the system's vital signs.
    * [Monitoring & alerting](https://sre.google/sre-book/monitoring-distributed-systems/) [review]
      > Watch the four golden signals and alert on user-visible symptoms, not causes — a page
      > should always mean a human decision is needed right now.
    * [Distributed tracing](https://opentelemetry.io/docs/concepts/signals/traces/) [contextual]
      > One request, every hop: traces turn 'something is slow somewhere' into 'this call, in
      > this service, this long'.
    * [Structured logging](https://opentelemetry.io/docs/concepts/signals/logs/) [review]
      > Record useful events with consistent fields and correlation identifiers
      > where available. Protect sensitive data and set retention and volume
      > limits; add trace correlation when the system uses tracing.
    * [Continuous profiling](https://www.cncf.io/blog/2022/05/31/what-is-continuous-profiling/) [contextual]
      > Use production profiles when CPU, memory, allocation, or lock behavior
      > needs code-level diagnosis. Measure collection overhead, sampling
      > coverage, retention, and data sensitivity before expanding collection.
  * [Continuous improvement](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/) [review]
    > Delivery creates evidence. Use it to improve the product and the system instead of ending
    > the learning cycle at deployment.
    * [Outcome reviews](https://martinfowler.com/bliki/OutcomeOverOutput.html) [review]
      > Compare adoption, user outcomes, quality, cost, and risk with the measures defined during
      > discovery. Change or retire work that does not produce the intended result.
    * [Retrospectives](https://scrumguides.org/scrum-guide.html#sprint-retrospective) [review]
      > Inspect how the team works at a useful cadence, choose a small improvement, assign an
      > owner, and verify whether the change helped.
    * [Operational feedback](https://sre.google/workbook/eliminating-toil/) [review]
      > Feed incidents, support requests, performance, security findings, and toil into product
      > and technical priorities alongside feature demand.

## Keep ++**sweeping**++ :sparkles:

*[Technology scouting]: Technology scouting identifies and evaluates emerging technologies.
*[Psychological safety]: A shared belief that the team is safe for interpersonal risk-taking.
*[Design systems]: A shared library of components, tokens, and guidelines that keeps product UI consistent.
*[Impact mapping]: A planning technique connecting deliverables to the outcomes and actors they serve.
*[Developer Experience]: The experience developers have while using or working on products.
*[Instrumentation]: Adding or configuring signals that answer questions about software behavior.
*[Progressive delivery]: Progressive delivery gives granular control over how releases reach users.
*[Docs-as-Code]: Documentation managed with the same tools and processes as source code.
*[Testability]: The degree to which a software artifact supports testing.
*[Test pyramid]: A test portfolio heuristic; choose the balance of focused, integration, and end-to-end tests for the system and its risks.
*[Refactoring]: Improving the internal structure of code without changing its observable behavior.
*[Team Topologies]: Organizing teams and their interactions for a fast flow of change.
*[TDD]: Test-driven development.
*[Deployability]: The ability to release, verify, and recover software predictably within acceptable disruption.
*[DoD]: Definition of Done, the agreed quality conditions for a usable increment; its scope does not universally require production deployment.
*[Branching strategy]: How a team organizes, merges, and releases branches of code.
*[Self-healing]: Automated recovery for understood failure modes, with limits and escalation when recovery fails.
*[Chaos engineering]: Building confidence in a system's resilience by experimenting with injected failures.
*[SRE]: Site Reliability Engineering.
*[DevOps]: Collaboration between development and operations.
*[DevSecOps]: Development, security, and operations.
*[Reliability]: The ability of a system to meet its stated behavior over a specified period and conditions.
*[Observability]: The ability to infer relevant internal conditions from the outputs a system produces.
*[Infrastructure as code]: Infrastructure managed and provisioned through machine-readable definitions.
*[ADRs]: Architecture Decision Records capture the context and consequences of significant design choices.
*[Threat modeling]: Identifying threats and mitigations in a design and revisiting them as the system changes.
*[Accessibility]: Building products usable by people with the widest range of abilities.
*[Merge queues]: Queues that validate every merge against the latest main before it lands.
*[Contract testing]: Verifying that services honor the expectations their consumers depend on.
*[Coding agents]: AI agents that plan, edit, run, and verify code changes under engineer supervision.
*[Context engineering]: Curating the instructions, tools, and knowledge an AI agent works from.
*[Spec-driven development]: Using an explicit specification to guide implementation and verification, including AI-assisted work.
*[DORA metrics]: Five measures of software-delivery throughput and instability.
*[FinOps]: Managing and optimizing cloud spend as a shared engineering discipline.
*[GitOps]: Managing versioned desired state through automated pull and continuous reconciliation attempts.
*[Platform engineering]: Product-managed internal platforms offering golden paths for delivery teams.
*[SLOs]: Service Level Objectives, measurable targets for service behavior over a defined period.
*[SLIs]: Service Level Indicators, precise measures of service behavior from a user's perspective.
*[Error budgets]: The amount of unreliability permitted by an SLO during its measurement window.
*[Incident response]: Coordinated detection, mitigation, and communication when production misbehaves.
*[Zero trust]: Never trust by network location; authenticate and authorize every access explicitly.
*[Green operations]: Running software to minimize its energy use and carbon footprint.
*[Blameless postmortems]: Learning from incidents without blaming the people involved.
*[Supply chain security]: Protecting the integrity of dependencies, builds, and released artifacts.
*[SBOM]: Software Bill of Materials, an inventory of components identified in a software artifact.
*[Structured logging]: Emitting logs as queryable structured events rather than free text.
*[Product analytics]: Measuring product behavior and outcomes against explicit success criteria.
*[Customer feedback]: Evidence gathered directly and indirectly from the people a product serves.
*[Functional requirements]: Observable behavior that users or dependent systems need.
*[Quality attributes]: Measurable constraints such as reliability, performance, security, and usability.
*[NFRs]: Non-functional requirements, the traditional name for quality attributes.
*[Acceptance criteria]: Observable examples that determine whether a requirement is satisfied.
*[Traceability]: Connections among requirements, decisions, tests, releases, and evidence.
*[Quality engineering]: Building quality into design, development, verification, and operation.
*[Configuration management]: Controlling environment-specific settings independently from code.
*[Artifact provenance]: Verifiable information about where, when, and how a software artifact was produced.
*[Database evolution]: Changing schemas and data safely while application versions coexist.
*[Release verification]: Checks and observations that assess a deployed release against defined health criteria.
*[Rollback & roll-forward]: Complementary strategies for recovering from a harmful release.
*[Dependency management]: Inventorying, evaluating, updating, and retiring third-party components.
*[Accessibility testing]: Evaluating whether people with disabilities can use the product.
*[Security testing]: Combining automated and human checks to verify security controls.
*[Runbooks]: Actionable operational guidance linked to alerts and known failure scenarios.
*[RTOs]: Recovery Time Objectives, the target time for restoring an interrupted capability.
*[RPOs]: Recovery Point Objectives, the acceptable amount of data loss measured in time.
*[Disaster recovery]: Restoring critical services, data, identity, and dependencies after disruption.
*[Secure development lifecycle]: Integrating security requirements and verification throughout delivery.
*[Application security controls]: Controls for identity, access, input, output, data, and error handling.
*[Vulnerability response]: Reporting, triaging, remediating, and learning from vulnerabilities.
*[Continuous profiling]: Repeatedly measuring code-level resource consumption in production.
*[Continuous improvement]: Using product and operational evidence to improve the next cycle of work.
*[Documentation]: Maintained information that helps users, maintainers, and operators act.
*[Build & release separation]: Distinguishing artifact creation, release configuration, and execution.
