#!/usr/bin/env python3
"""Shared generator helpers."""
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).parent / "src/screens/learninghub"


def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")


def C(cid, label, feedback, correct=False):
    return (cid, label, correct, feedback)


def ph(icon, title, quote, content, subpoints, practical, exercises):
    return {"icon": icon, "title": title, "quote": quote, "content": content,
            "subpoints": subpoints, "practical": practical, "exercises": exercises}


def ex(title, question, choices, tip):
    return {"icon": None, "title": title, "question": question,
            "choices": choices, "tip": tip}


def render_choice(c):
    cid, label, correct, feedback = c
    correct_str = "true" if correct else "false"
    return f"          {{ id: '{cid}', label: '{esc(label)}', isCorrect: {correct_str}, feedback: '{esc(feedback)}' }},"


def render_exercise(phase_num, ex_num, ex, code_prefix, default_icon):
    eid = f"{code_prefix}-{phase_num}-{ex_num}"
    choices_str = "\n".join(render_choice(c) for c in ex["choices"])
    icon = ex.get("icon") or default_icon
    return dedent(f"""\
              {{
                id: '{eid}',
                icon: '{esc(icon)}',
                title: '{esc(ex['title'])}',
                question: '{esc(ex['question'])}',
                choices: [
        {choices_str}
                ],
                espenTip: '{esc(ex['tip'])}',
              }},""")


def render_subpoint(sp):
    label, text = sp
    return f"          {{ label: '{esc(label)}', text: '{esc(text)}' }},"


def render_phase(p, phase_num, code_prefix):
    subpoints_str = "\n".join(render_subpoint(s) for s in p["subpoints"])
    exercises_str = "\n".join(
        render_exercise(phase_num, i + 1, ex, code_prefix, p["icon"])
        for i, ex in enumerate(p["exercises"])
    )
    return dedent(f"""\
          {{
            phaseNumber: {phase_num},
            icon: '{esc(p['icon'])}',
            title: '{esc(p['title'])}',
            quote: '{esc(p['quote'])}',
            content: '{esc(p['content'])}',
            subpoints: [
        {subpoints_str}
            ],
            practical: '{esc(p['practical'])}',
            exercises: [
        {exercises_str}
            ],
          }},""")


def render_module(m):
    code_prefix = m["module_code"].lower().replace("-", "")
    phases_str = "\n".join(render_phase(p, i + 1, code_prefix) for i, p in enumerate(m["phases"]))
    presentation_link = ""
    if m.get("presentation_route"):
        presentation_link = f"\n      presentationLink={{{{ route: '{m['presentation_route']}', description: '{esc(m['presentation_desc'])}' }}}}"
    folder_depth = m["folder"].count("/") + 1
    rel = "../" * folder_depth + "shared"
    return dedent(f"""\
        import DrawerModule from '{rel}/DrawerModule'
        import type {{ DrawerPhase }} from '{rel}/DrawerModule'

        export const phases: DrawerPhase[] = [
        {phases_str}
        ]

        export default function {m['module_name']}Module() {{
          return (
            <DrawerModule
              moduleCode="{m['module_code']}"
              moduleTitle="{esc(m['module_title'])}"
              moduleIcon="{esc(m['icon'])}"
              storageKey="{m['storage_key']}"
              completeRoute="{m['complete_route']}"
              phases={{phases}}
              intro="{esc(m['intro'])}"
              vissteduAt="{esc(m['vissteduat'])}"
              espenSier="{esc(m['espensier'])}"{presentation_link}
            />
          )
        }}
        """)


def render_complete(m):
    outcomes_str = "\n".join(f"        '{esc(o)}'," for o in m["outcomes"])
    retry_route = m["complete_route"].replace("/complete", "")
    folder_depth = m["folder"].count("/") + 1
    rel = "../" * folder_depth + "shared"
    return dedent(f"""\
        import LearningComplete from '{rel}/LearningComplete'

        export default function {m['module_name']}Complete() {{
          return (
            <LearningComplete
              moduleTitle="{esc(m['module_title'])}"
              moduleIcon="{esc(m['icon'])}"
              retryRoute="{retry_route}"
              learningOutcomes={{[
        {outcomes_str}
              ]}}
            />
          )
        }}
        """)


def write_modules(modules, batch_label):
    print(f"\n=== {batch_label} ===")
    for m in modules:
        target_dir = ROOT / m["folder"]
        target_dir.mkdir(parents=True, exist_ok=True)
        module_path = target_dir / f"{m['module_name']}Module.tsx"
        complete_path = target_dir / f"{m['module_name']}Complete.tsx"
        module_path.write_text(render_module(m))
        complete_path.write_text(render_complete(m))
        n_ex = sum(len(p["exercises"]) for p in m["phases"])
        print(f"  + {m['module_name']} ({len(m['phases'])} faser, {n_ex} øvelser)")


def M(name, folder, code, title, icon, slug_path, subj_root, intro, vissteduat, espensier, phases, outcomes):
    """Compact module factory. subj_root = 'ml2'/'ent1'/'ent2'/etc for storageKey."""
    return {
        "module_name": name, "folder": folder, "module_code": code,
        "module_title": title, "icon": icon,
        "storage_key": f"learning-{subj_root}-{slug_path}",
        "complete_route": f"/learning/{subj_root}/{slug_path}/complete",
        "presentation_route": f"/learning/presentations/{subj_root}/{slug_path}",
        "presentation_desc": f"{title} — 10 slides",
        "intro": intro, "vissteduat": vissteduat, "espensier": espensier,
        "phases": phases, "outcomes": outcomes,
    }
